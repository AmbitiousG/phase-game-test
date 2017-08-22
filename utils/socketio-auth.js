var _ = require('lodash');
var jwt = require('jsonwebtoken');
// var jwt = require('jwt-simple');
const NO_AUTH_TOKEN = 1;
const AUTH_EXPIRED = 2;
const JWT_ERROR = 3;

var defaultOptions = {
  algorithm: 'HS256',
  succeedWithoutToken: false
};

function authenticate(options, verify) {
  var _this = this;
  this.options = _.assign(defaultOptions, options);
  if (!this.options.secret) {
    throw new TypeError('SocketioJwtAuth requires a secret');
  }

  this.verify = verify;
  if (!this.verify) {
    throw new TypeError('SocketioJwtAuth requires a verify callback');
  }

  this.success = function(next) {
    next();
  }

  this.fail = function(err, next) {
    console.log(err)
    next(new Error(err));
  }

  return function(socket, next) {
    var token = socket.handshake.query.token;
    var verified = function(err, user, message) {
      if (err) {
        return _this.fail(err, next);
      } else if (!user) {
        if (!_this.options.succeedWithoutToken) return _this.fail(message, next);
        socket.request.user = {logged_in: false};
        return _this.success(next)
      } else {
        user.logged_in = true;
        socket.request.user = user;
        return _this.success(next);
      }
    };
    try {
      var payload = {};
      if (!token) {
        if (!_this.options.succeedWithoutToken) {
          return _this.fail(JSON.stringify({
            type: NO_AUTH_TOKEN,
            message: 'No auth token'
          }), next);
        }
      } else {
        jwt.verify(token, _this.options.secret, {
          algorithms: [_this.options.algorithm]
        }, (err, decoded) => {
          if(err){
            var errObj = {
              type: err.name == 'TokenExpiredError' ? AUTH_EXPIRED : JWT_ERROR
            };
            return _this.fail(JSON.stringify(errObj), next);
          }
          else{
            _this.verify(decoded, verified);
          }
        });
      }
    } catch (ex) {
      _this.fail(ex, next);
    }
  }
}

exports.authenticate = authenticate;