var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secretkey = require('../utils/auth').secretkey;
var sodium = require('libsodium-wrappers');
var query_str = require('../db/query_str');

router.post('/login', function(req, res, next) {
  var {username, password} = req.body;
  var isValid = false;
  var sql = 'SELECT UserID, Password, Salt FROM Users WHERE UserName = ?';
  var paras = [username];
  query_str(req.app, sql, paras, (results, fields) => {
    var records = results;
    if(records.length > 0){
      var {UserID, Password, Salt} = records[0];
      var hashedPW = sodium.crypto_hash(Salt + password, 'hex');
      if(Password == hashedPW) {//pass validation
        isValid = true;
        var tokenData = {
          username,
          id: UserID
        };
        var token = jwt.sign(tokenData, secretkey, {
          expiresIn: '3d'
        });
        res.json({username, token});
      }
    }
    if(!isValid){
      res.json({
        error: 'invalid username or password!'
      })
    }
  })
});

module.exports = router;
