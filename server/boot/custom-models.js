var salt = 'keyboard cat';

module.exports = function(app) {
  var originalCreate = app.models.gallery.create;

  app.models.gallery.create = function() {
    var args = Array.prototype.slice.call(arguments);

    var counter = 0;

    var proposedUrl = new Buffer(args[0].title + salt).toString('base64');

    var finish = function() {
      args[0].url = proposedUrl;
      originalCreate.apply(app.models.gallery, args);
    };

    var checkUniqueness = function() {
      app.models.gallery.findOne({
        'fields' : 'id',
        'where'  : {
          'url' : proposedUrl
        }
      }, function(err, res) {
        if (!res) {
          return finish(proposedUrl);
        }

        proposedUrl = new Buffer(args[0].title + salt + (counter++)).toString('base64');
        checkUniqueness();
      });
    };

    checkUniqueness();

  };
};
