var _ = require('lodash');
var mysql = require('mysql');
var config = require('./config');
var { host, user, password, database } = config;

var pool = mysql.createPool(_.assign({
  connectionLimit: 10,
  host: '',
  user: '',
  password: '',
  database: ''
}, { host, user, password, database }));

pool.on('connection', function(connection) {
  console.log('connected');
});

module.exports = pool;