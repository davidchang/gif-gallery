module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/', function(req, res) {
    return res.sendFile('/client/index.html');
  });
  server.use(router);
};
