var data = require('./client/data');
var _ = require('lodash');
var md5 = require('MD5');
var dataUriToBuffer = require('data-uri-to-buffer');

var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

var s3bucket = new AWS.S3({ params: { Bucket: 'gif-gallery' } });

var upload = function(title, message, source) {
  var origTitle = title;
  title = md5(title);
  s3bucket.upload({
    'Key'         : title + '.gif',
    'Body'        : dataUriToBuffer(source),
    'ContentType' : 'image/gif'
  }, function (err, data) {
    if (err) {
      console.log('err', err);
      return cb(err);
    }
    console.log('{');
    console.log('  1DATA ' + origTitle);
    console.log('  2DATA ' + message);
    console.log('  3DATA ' + data.Location);
    console.log('},');
  });
};

// _.each(data, function(val, key) {
var keys = Object.keys(data);
console.log('length', keys.length);
for (var i = 25; i < keys.length; ++i) {
  var key = keys[i];
  var val = data[key];

  upload(key, val.message, val.src);
}
// });