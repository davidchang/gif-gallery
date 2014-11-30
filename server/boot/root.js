module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', function(req, res) {
    return res.redirect('/webpack.html');
    // return server.loopback.status()
  });
  server.use(router);
};
