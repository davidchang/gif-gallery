var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var galleryActions = require('actions/galleryActions');
var galleryStore = require('stores/galleryStore');

module.exports = React.createClass({
  mixins : [Router.State, Reflux.listenTo(galleryStore, '_onStatusChange')],

  getInitialState : function() {
    return {
      'gallery' : {}
    };
  },

  _onStatusChange : function(galleryData) {
    if (_.isNull(galleryData.gallery)) {
      this.setState({
        'invalidUrl' : true
      });

      return;
    }

    this.setState({
      'gallery' : galleryData.gallery
    });
  },

  componentDidMount : function() {
    galleryActions.findOneGallery(`filter[where][url]=${this.getParams().galleryId}`);
  },

  _renderInvalidUrl : function() {
    return (
      <section className="gallery-container">
        <div className="page-wrapper">
          <h1>Invalid Gallery URL</h1>
        </div>
      </section>
    );
  },

  render : function() {

    if (this.state.invalidUrl) {
      return this._renderInvalidUrl();
    }

    return (
      <section className="gallery-container">
        <div className="page-wrapper">
          <h1>Everyone Who Said Hi on your Birthday!</h1>
        </div>
        <div>
          {(this.state.gallery.gifs || []).map(gif => {
            return (
              <section>
                <img src={gif.gif} />
                <div>{gif.message}</div>
              </section>
            );
          })}
        </div>
      </section>
    );
  }

});
