var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var galleryActions = require('actions/galleryActions');
var galleryStore = require('stores/galleryStore');

var InvalidUrlHelper = require('lib/InvalidUrlHelper');

var lastGalleryId = null;

module.exports = React.createClass({
  mixins : [
    Router.State,
    Router.Navigation,
    Reflux.listenTo(galleryStore, '_onStatusChange'),
    InvalidUrlHelper
  ],

  getInitialState : function() {
    return {
      'gallery' : {}
    };
  },

  componentDidMount : function() {
    lastGalleryId = this.getParams().galleryId;
    galleryActions.findOneGallery(`filter[where][url]=${lastGalleryId}`);
  },

  // since you may be redirecting from an invalid /view/id page to /view/404
  componentWillReceiveProps : function() {
    if (lastGalleryId !== this.getParams().galleryId) {
      lastGalleryId = this.getParams().galleryId;
      this.setState({
        invalidUrl : false
      });
      galleryActions.findOneGallery(`filter[where][url]=${lastGalleryId}`);
    }
  },

  _goToRecord : function() {
    this.transitionTo('record', this.getParams());
  },

  render : function() {

    if (this.state.invalidUrl) {
      return this._renderInvalidUrl();
    }

    var recordLink = '';

    // avoid FOUC
    if (this.state.gallery.title) {
      recordLink = <a onClick={this._goToRecord}>Add a Gif to this gallery</a>;
    }

    return (
      <section className="gallery-container">
        <div className="page-wrapper">
          <h1>{this.state.gallery.title}</h1>
          <h3>{this.state.gallery.description}</h3>

          <div>{recordLink}</div>

          <div id="gif-list">
            {(this.state.gallery.gifs || []).map(gif => {
              return (
                <div className="gif-item" key={gif.url}>
                  <img src={gif.url} />
                  <div>{gif.message}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

});
