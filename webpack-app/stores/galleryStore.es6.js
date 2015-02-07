var Reflux = require('reflux');
var _ = require('lodash');

var request = require('superagent');

var galleryActions = require('actions/galleryActions');
var GalleryModel = require('lib/GalleryModel');

module.exports = Reflux.createStore({
  listenables: galleryActions,

  init: function() {
    this.gallery = null;
  },

  onCreateGalleryCompleted : function(res) {
    this.gallery = res.body;
    this.emitChange('galleryCreated');
  },

  onCreateGalleryFailed : function() {

  },

  onFindOneGalleryCompleted : function(res) {
    this.gallery = res.body;
    this.emitChange();
  },

  onFindOneGalleryFailed : function() {
    this.gallery = null;
    this.emitChange();
  },

  onUpsertGalleryCompleted : function(res) {
    this.gallery = res.body;
    this.emitChange('galleryUpdated');
  },

  onUpsertGalleryFailed : function() {

  },

  getExposedData : function() {
    return {
      'gallery' : this.gallery
    };
  },

  emitChange : function(status) {
    var expose = this.getExposedData();

    if (status) {
      expose._status = status;
    }

    this.trigger(expose);
  }

});