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

  onCreateGallery : function(inputData) {
    GalleryModel.create(inputData, (error, res) => {
      if (!error) {
        // redirect to res.body.url
        location.hash = `#/record/${res.body.url}`;
      }
    });
  },

  onFindOneGallery : function(params) {
    GalleryModel.findOne(params, (error, res) => {
      console.log('onFindOneGallery res', res);
      if (!error && !_.isEmpty(res.body)) {
        this.gallery = res.body;
      } else {
        this.gallery = null;
      }
      this.emitChange();
    });
  },

  // TODO does this actually work?
  onUpsertGallery : function(params) {
    GalleryModel.upsert(params, (error, res) => {
      console.log('onUpsertGallery res', res);
    });
  },

  onSendGif : function(data) {
    console.log('data', data);
  },

  getExposedData : function() {
    return {
      'gallery' : this.gallery
    };
  },

  emitChange : function() {
    this.trigger(this.getExposedData());
  }

});