var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secretkey = require('../utils/auth').secretkey;
var sodium = require('libsodium-wrappers');
var query_str = require('../db/query_str');

// for (var i = 0; i < 2; i++) {
//   var key = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES, 'hex');
//   console.log(sodium.crypto_hash(key + 'test', 'hex'));
// }

/* GET home page. */
router.post('/register', function(req, res, next) {
  var {username, password, email} = req.body;
  var isValid = false;
  var sql = 'SELECT Count(*) AS Count FROM Users WHERE UserName = ? OR Email = ?';
  var paras = [username, email];
  query_str(req.app, sql, paras, (results, fields) => {
    var records = results[0];
    if(records.Count == 0){
      var salt = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES, 'hex');
      var hashedPW = sodium.crypto_hash(`${salt}${password}`, 'hex');
      sql = 'INSERT INTO Users (UserName, Password, Email, CreatedDate, Salt) VALUES(?, ?, ?, NOW(), ?)';
      paras = [username, hashedPW, email, salt];
      query_str(req.app, sql, paras, (results, fields) => {
        res.json({
          success: true
        });
      })
    }
    else {
      res.json({
        success: false,
        error: 'username or email exists!'
      })
    }
  })
});

module.exports = router;
