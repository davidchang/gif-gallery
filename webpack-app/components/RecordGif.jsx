var React = require('react');
var gumHelper = require('lib/gumhelper');

var galleryActions = require('actions/galleryActions');

var startingInterval;

var capture = (callback, priorToGifCallback) => {
  var numFrames = 10,
    interval = 0.3;

  var pendingFrames = numFrames;
  var ag = new Animated_GIF({ workerPath: 'Animated_GIF.worker.min.js' });
  ag.setSize(320, 240);
  ag.setDelay(interval);

  captureFrame();

  function captureFrame() {
    ag.addFrame(video);
    pendingFrames--;

    if(pendingFrames > 0) {
      setTimeout(captureFrame, interval * 1000); // timeouts are in milliseconds
    } else {
      priorToGifCallback && priorToGifCallback();

      ag.getBase64GIF(function(image) {

        // Ensure workers are freed-so we avoid bug #103 https://github.com/meatspaces/meatspace-chat/issues/103
        ag.destroy();

        callback(image);
      });
    }
  }
};

module.exports = React.createClass({

  getInitialState: function() {
    return {
      'mode'                 : 'taking',
      'recordButtonDisabled' : false
    };
  },

  componentDidMount : function() {
    if(navigator.getMedia) {
      gumHelper.startVideoStreaming(function(err, stream, videoElement) {
        if(err) {
          window.alert(err.message);
        } else {
          videoContainer.appendChild(videoElement);
          video = videoElement;
        }
      });
    } else {
      window.alert(':/ looks like your browser does not support getUserMedia - could you get Chrome on a desktop?');
    }
  },

  _shootGifSoon : function() {

    var startingInSeconds = 3;
    var counter = 3;

    this.setState({
      'countdownText'        : `Starting in ${startingInSeconds} seconds...`,
      'recordButtonDisabled' : true
    });

    startingInterval = setInterval(() => {
      if (!counter) {
        this.setState({
          'countdownText' : `Recording for  ~${startingInSeconds} seconds...`
        });
        clearInterval(startingInterval);
        return;
      }

      this.setState({
        'countdownText' : `Starting in ${counter} seconds...`
      });
      counter--;
    }, 1000);

    setTimeout(() => {
      capture(image => {

      }, () => {

      });
    }, startingInSeconds * 1000);
  },

  render : function() {
    var title = 'Please Say Hi to Suzi for her Birthday!';
    var description = 'We may not have seen you recently because we moved away, but I know Suzi would love to see your smiling faces! Please send her a GIF and a message for her birthday! (I\'m keeping this a secret until Sunday)';

    var takingHtml = (
      <section id="takingPicture">
        <div id="videoContainer"></div>
        <div id="snapHolder">
          <button className="btn main-button" onClick={this._shootGifSoon}>Shoot GIF Soon</button>
          <span>{this.state.countdownText}</span>
        </div>
      </section>
    );

    var sendingHtml = (
      <section id="sendingPicture">
        <h3>Generated GIF:</h3>
        <h5>If you're unsatisfied, you can always <button id="again" className="btn">try again</button></h5>
        <img id="previewImage"></img>
        <textarea id="message" placeholder="Please leave Suzi a 'Happy Birthday!' sort of message here!" className="form-control" rows="3"></textarea>
        <button className="btn main-button">Send GIF and message</button>
      </section>
    );

    var bodyHtml = this.state.mode === 'taking' ? takingHtml : sendingHtml;

    return (
      <div className="page-wrapper">
        <h1>{title}</h1>
        <h3>{description}</h3>
        <h5>[You'll need to enable webcam access and use a modern desktop browser]</h5>
        <h5>[If you have a modern desktop browser and you see an error, try again a few times?]</h5>

        {bodyHtml}

        <canvas id="canvas" width="640" height="480"></canvas>
      </div>
    );
  }

});
