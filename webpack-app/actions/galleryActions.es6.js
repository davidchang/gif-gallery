var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'createGallery',
  'createGallerySuccess',
  'createGalleryFailure',

  'sendGif',
  'sendGifSuccess',
  'sendGifFailure'
]);