var Reflux = require('reflux');
var GalleryModel = require('lib/GalleryModel');

var Actions = Reflux.createActions({
  'createGallery'   : { 'asyncResult' : true },
  'findOneGallery'  : { 'asyncResult' : true },
  'upsertGallery'   : { 'asyncResult' : true },
  'addGifToGallery' : { 'asyncResult' : true }
});

// could probably do this.completed without fat arrow binding on listen function
// since this can't be rebound at that point
Actions.createGallery.listen(function(inputData) {

  inputData.gifs = [];

  GalleryModel.create(inputData, (error, res) => {
    if (!error && res.status != 404) {
      return this.completed(res);
    }

    return this.failed(error);
  });
});

Actions.findOneGallery.listen(function(params) {
  GalleryModel.findOne(params, (error, res) => {
    if (!error && res.status != 404) {
      return this.completed(res);
    }

    return this.failed(error);
  });
});

Actions.upsertGallery.listen(function(params) {
  GalleryModel.upsert(params, (error, res) => {
    if (!error && res.status != 404) {
      return this.completed(res);
    }

    return this.failed(error);
  });
});

Actions.addGifToGallery.listen(function(gallery, gifData) {
  // var params = { id : galleryId, gif : gif };
  var fileTitle = `${gallery.title}_gif${gallery.gifs.length}`;
  GalleryModel.addGifToGallery(fileTitle, gifData.source, (error, res) => {
    if (!error && res.status != 404) {
      return this.completed(res);
    }

    return this.failed(error);
  });
});

module.exports = Actions;