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
    this.setState({
      'gallery' : galleryData.gallery
    });
  },

  componentDidMount : function() {
    galleryActions.findOneGallery(`filter[where][url]=${this.getParams().galleryId}`);
  },

  render : function() {
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
