var md5 = require('MD5');
var dataUriToBuffer = require('data-uri-to-buffer');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

var s3bucket = new AWS.S3({ params: { Bucket: 'gif-gallery' } });

module.exports = function(gallery) {

  gallery.addGifToGallery = function(title, source, cb) {

    title = md5(title + '_' + new Date().valueOf());

    // TODO ultimately, this key must be unique
    // title should avoid capital letters, periods, underscores, < 32 chars long

    var upload = function() {
      s3bucket.upload({
        'Key'         : title + '.gif',
        'Body'        : dataUriToBuffer(source),
        'ContentType' : 'image/gif'
      }, function (err, data) {
        if (err) {
          console.log('err', err);
          return cb(err);
        }
        cb(null, data.Location);
      });
    };

    var checkUniqueness = function() {
      // this should check that it's unique before it actually calls upload
      upload();

      // could modify title here
      // title = md5(title);
    };

    checkUniqueness();
  };


  gallery.remoteMethod(
    'addGifToGallery',
    {
      accepts : [
        { arg: 'title',  type: 'string' },
        { arg: 'source', type: 'string' }
      ],
      returns : { arg: 'url', type: 'string' },
      http : {
        path : '/addGifToGallery'
      }
    }
  );
};
