var path = require('path');

module.exports = function(server) {
  var router = server.loopback.Router();
  var sendFile = function(req, res) {
    return res.sendFile(path.join(__dirname, './../../client', 'index.html'));
  };

  /*
    // this was relevant before realizing I needed to handle 404 cases
    router.get('/', sendFile);
    router.get('/create', sendFile);
    router.get(/\/view\/.*[^\.js]$/, sendFile);
    router.get('/record/*', sendFile);
  */

  // terribly hacky, but keeping this in like this:
  router.get('/Animated_GIF.min.js', function(req, res) {
    return res.sendFile(path.join(__dirname, './../../client', 'Animated_GIF.min.js'));
  });
  // this only gets loaded on the record page..
  router.get('/record/Animated_GIF.worker.min.js', function(req, res) {
    return res.sendFile(path.join(__dirname, './../../client', 'Animated_GIF.worker.min.js'));
  });
  router.get('/prod.bundled.js', function(req, res) {
    return res.sendFile(path.join(__dirname, './../../client', 'prod.bundled.js'));
  });

  // even the 404s, we want to send that client/index.html
  router.get('*', sendFile);

  server.use(router);
};
