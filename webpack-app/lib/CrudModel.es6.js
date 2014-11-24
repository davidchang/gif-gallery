var request = require('superagent');

module.exports = class CrudModel {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  create(data, cb) {
    return request.post(this.endpoint)
      .send(data)
      .end(cb);
  }

  get(params, cb) {
    return request.get(this.endpoint)
      .send(params)
      .end(cb);
  }
}