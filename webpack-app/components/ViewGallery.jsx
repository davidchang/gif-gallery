var React = require('react');

var galleryActions = require('actions/galleryActions');
var galleryStores = require('stores/galleryStore');

module.exports = React.createClass({

  componentDidMount : function() {
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
