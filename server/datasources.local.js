module.exports = {
  'db' : {
    'connector' : 'mongodb',
    'url'       : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/db'
  }
};