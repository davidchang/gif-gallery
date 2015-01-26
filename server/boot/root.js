var path = require('path');

module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, './../../client', 'index.html'));
  });
  server.use(router);
};
