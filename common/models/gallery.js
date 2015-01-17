var md5 = require('MD5');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

var s3bucket = new AWS.S3({ params: { Bucket: 'gif-gallery' } });

module.exports = function(gallery) {

  gallery.addGifToGallery = function(title, source, cb) {

    title = md5(title);

    // TODO ultimately, this key must be unique

    s3bucket.upload({
      'Key'         : title + '.gif',
      'Body'        : source,
      'ContentType' : 'image/gif',
    }, function (err, data) {
      if (err) {
        console.log('err', err);
        return cb(err);
      }
      console.log('data', data);
      cb(null, data.Location);
    });

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
