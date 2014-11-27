var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var gumHelper = require('gumhelper');

var galleryActions = require('actions/galleryActions');
var galleryStore = require('stores/galleryStore');

var startingInterval;
var video;

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
  mixins : [Router.State, Reflux.listenTo(galleryStore, '_onStatusChange')],

  _onStatusChange : function(galleryData) {
    this.setState({
      'gallery' : galleryData.gallery
    });
  },

  getInitialState : function() {
    return {
      'mode'                 : 'taking',
      'recordButtonDisabled' : true,
      'gallery'              : {
        'title'       : '',
        'description' : ''
      }
    };
  },

  componentDidMount : function() {
    if (navigator.getMedia) {
      gumHelper.startVideoStreaming((err, stream, videoElement) => {
        if(err) {
          window.alert(err.message);
        } else {
          videoContainer.appendChild(videoElement);
          video = videoElement;

          this.setState({
            'recordButtonDisabled' : false
          });
        }
      });
    } else {
      window.alert(':/ looks like your browser does not support getUserMedia - could you get Chrome on a desktop?');
    }

    galleryActions.findOneGallery(`filter[where][url]=${this.getParams().galleryId}`);
  },

  _shootGifSoon : function() {

    var startingInSeconds = 3;
    var counter = 3;

    this.setState({
      'countdownText'        : `Starting in ${startingInSeconds} seconds...`,
      'recordButtonDisabled' : true
    });

    startingInterval = setInterval(() => {
      counter--;
      if (!counter) {
        this.setState({
          'countdownText' : `Recording...`
        });
        clearInterval(startingInterval);
        return;
      }

      this.setState({
        'countdownText' : `Starting in ${counter} seconds...`
      });
    }, 1000);

    setTimeout(() => {
      capture(image => {
        this.setState({
          'gifSource' : image,
          'mode'      : 'sending'
        });
      }, () => {
        this.setState({
          'mode' : 'saving'
        });
      });
    }, startingInSeconds * 1000);
  },

  _tryAgain : function() {
    this.setState({
      'countdownText'        : '',
      'mode'                 : 'taking',
      'recordButtonDisabled' : false
    });
  },

  _sendGifAndMessage : function() {

    var gallery = _.clone(this.state.gallery, true);

    gallery.gifs = gallery.gifs || [];
    gallery.gifs.push({
      'gif'     : this.state.gifSource,
      'message' : document.getElementById('message').value
    });

    return galleryActions.upsertGallery(gallery);
  },

  render : function() {
    // var title = 'Please Say Hi to Suzi for her Birthday!';
    // var description = 'We may not have seen you recently because we moved away, but I know Suzi would love to see your smiling faces! Please send her a GIF and a message for her birthday! (I\'m keeping this a secret until Sunday)';

    var bodyHtml = '';
    if (this.state.mode === 'sending') {
      bodyHtml = (
        <section style={{'width' : '640px'}}>
          <h3>Generated GIF:</h3>
          <h5>
            If you're unsatisfied, you can always
            <button className="btn main-button red" onClick={this._tryAgain} style={{'marginLeft' : '10px'}}>
              try again
            </button>
          </h5>
          <img style={{'backgroundColor' : '#1abc9c'}} className="camera-container" src={this.state.gifSource}></img>
          <textarea id="message" placeholder="Please leave Suzi a 'Happy Birthday!' sort of message here!" className="form-control" rows="3"></textarea>
          <button onClick={this._sendGifAndMessage} style={{'marginTop' : '10px'}} className="btn main-button">
            Send GIF and message
          </button>
        </section>
      );
    } else {
      var isSaving = this.state.mode === 'saving';
      var takingPictureStyle = !isSaving ? {} : { 'opacity' : 0.4 };

      bodyHtml = (
        <section style={takingPictureStyle}>
          <div id="videoContainer" className="camera-container"></div>
          <div>
            <button disabled={this.state.recordButtonDisabled} className="btn main-button" onClick={this._shootGifSoon}>
              Shoot 3 second GIF
            </button>
            <span style={{'marginLeft' : '10px'}}>{isSaving ? 'Saving...' : this.state.countdownText}</span>
          </div>
        </section>
      );
    }

    return (
      <div className="page-wrapper">
        <h1>{this.state.gallery.title}</h1>
        <h3>{this.state.gallery.description}</h3>
        <h5>[You'll need to enable webcam access and use a modern desktop browser]</h5>
        <h5>[If you have a modern desktop browser and you see an error, try again a few times?]</h5>

        {bodyHtml}
      </div>
    );
  }

});
