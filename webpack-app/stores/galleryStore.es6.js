var Reflux = require('reflux');

var request = require('superagent');

var galleryActions = require('actions/galleryActions');
var GalleryModel = require('lib/GalleryModel');

module.exports = Reflux.createStore({
  listenables: galleryActions,

  init: function() {
    this.loggedIn = false;
    this.user = null;
  },

  onCreateGallery : function(inputData) {
    GalleryModel.create(inputData, (error, res) => {
      this.emitChange();
    });
  },

  getExposedData : function() {
    return {
      'loggedIn' : this.loggedIn,
      'user'     : this.user
    };
  },

  emitChange : function() {
    this.trigger(this.getExposedData());
  }

});