var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var galleryActions = require('actions/galleryActions');
var galleryStore = require('stores/galleryStore');

var InvalidUrlHelper = require('lib/InvalidUrlHelper');

module.exports = React.createClass({
  mixins : [Router.State, Reflux.listenTo(galleryStore, '_onStatusChange'), InvalidUrlHelper],

  getInitialState : function() {
    return {
      'gallery' : {}
    };
  },

  componentDidMount : function() {
    galleryActions.findOneGallery(`filter[where][url]=${this.getParams().galleryId}`);
  },

  render : function() {

    if (this.state.invalidUrl) {
      return this._renderInvalidUrl();
    }

    return (
      <section className="gallery-container">
        <div className="page-wrapper">
          <h1>{this.state.gallery.title}</h1>
          <h3>{this.state.gallery.description}</h3>
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
