var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var galleryActions = require('actions/galleryActions');
var galleryStore = require('stores/galleryStore');

module.exports = React.createClass({
  mixins : [Router.State, Reflux.listenTo(galleryStore, '_onStatusChange')],

  _onStatusChange : function(galleryData) {
    console.log('status changed!', galleryData);
    this.setState({
      'gallery' : galleryData.gallery
    });
  },

  componentDidMount : function() {

    galleryActions.findOneGallery(`filter[where][url]=${this.getParams().galleryId}`);

    var $gallery = document.getElementById('gallery');

    var keys = Object.keys(data);
    keys = keys.sort(function() { return 0.5 - Math.random() });
    keys = keys.sort(function() { return 0.5 - Math.random() });
    keys.forEach(key => {
      var section = document.createElement('section');
      section.className = 'section';

      var img = document.createElement('img');
      img.src = data[key].src;

      var div = document.createElement('div');
      div.innerHTML = data[key].message;

      section.appendChild(img);
      section.appendChild(div);

      $gallery.appendChild(section);
    });

    var msnry = new Masonry( $gallery, {
      // options
      columnWidth: 0,
      itemSelector: '.section'
    });
  },

  render : function() {
    return (
      <section className="gallery-container">
        <div className="page-wrapper">
          <h1>Everyone Who Said Hi on your Birthday!</h1>
        </div>
        <div id="gallery"></div>
      </section>
    );
  }

});
