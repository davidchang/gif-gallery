var request = require('superagent');
var CrudModel = require('lib/CrudModel');

var GalleryModel = new CrudModel('/api/galleries');

GalleryModel.addGifToGallery = (title, source, cb) => {
  console.log('hello world');
  request.post('/api/galleries/addGifToGallery')
    .send({
      title  : title,
      source : source
    })
    .end(cb);
};

module.exports = GalleryModel;