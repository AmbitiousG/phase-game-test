var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var ex_jwt = require('express-jwt');
// var jwt_UnauthorizedError = require('express-jwt').UnauthorizedError;
var secretkey = require('./utils/auth').secretkey;
var errorCodeNotLogin = require('./utils/auth').errorCodeNotLogin;

// var index = require('./routes/index');
// var users = require('./routes/users');
var arrApi = require('./routes/api');
var login = require('./routes/login');
var register = require('./routes/register');

var history = require('connect-history-api-fallback');

var app = express();

//set mysql pool
var pool = require('./db/pool');
app.set('mysql_pool', pool);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middleware to proxy requests through a specified index page,
//useful for Single Page Applications that utilise the HTML5 History API.
app.use(history({
  index: '/index.html'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'xinxin-rainbow',
//   cookie: {maxAge: 60*1000*30},
//   resave: true,
//   saveUninitialized: false,
// }));

const authCheck = ex_jwt({
  secret: secretkey,
});

app.use('/api', authCheck, arrApi);
app.use('/login', [login, register]);

// app.post('/api/getList', (req, res) => {
//   res.send('api/getList')
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if(err.status == 401){
    res.json({
      errorCode: errorCodeNotLogin,
      error: 'not logged in'
    })
  }
  else{
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
