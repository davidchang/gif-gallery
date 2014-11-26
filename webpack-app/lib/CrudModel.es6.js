var request = require('superagent');

module.exports = class CrudModel {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  create(params, cb) {
    return request.post(this.endpoint)
      .send(params)
      .end(cb);
  }

  find(params, cb) {
    return request.get(this.endpoint)
      .send(params)
      .end(cb);
  }

  findOne(params, cb) {
    return request.get(`${this.endpoint}/findOne`)
      .send(params)
      .end(cb);
  }

  upsert(params, cb) {
    return request.put(this.endpoint)
      .send(params)
      .end(cb);
  }

  del(id, cb) {
    return request.del(`this.endpoint/${id}`)
      .end(cb);
  }
}