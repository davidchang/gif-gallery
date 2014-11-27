var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'createGallery',
  'createGallerySuccess',
  'createGalleryFailure',

  'findOneGallery',
  'findOneGallerySuccess',
  'findOneGalleryFailure',

  'upsertGallery',
  'upsertGallerySuccess',
  'upsertGalleryFailure'
]);