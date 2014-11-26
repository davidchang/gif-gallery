var salt = 'keyboard cat';

module.exports = function(app) {
  var originalCreate = app.models.gallery.create;

  app.models.gallery.create = function() {
    var args = Array.prototype.slice.call(arguments);

    args[0].url = new Buffer(args[0].title + salt).toString('base64');
    // TODO ensure that URL is unique

    originalCreate.apply(app.models.gallery, args);
  };
};
