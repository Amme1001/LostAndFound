var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var registerRouter = require('./routes/user/register');
var userRouter = require('./routes/user/user');
var loginRouter = require('./routes/user/login');
var bookRouter = require('./routes/porperty/book');
var otherRouter = require('./routes/porperty/other');
var walletRouter = require('./routes/porperty/wallet');
var udiskRouter = require('./routes/porperty/udisk');
var personRouter = require('./routes/person/person');
var commentRouter = require('./routes/comment/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 设置静态文件托管, 当用户的url以plblic开头，则返回对应__dirname + '/plblic'下的文件
app.use('/public', express.static(path.join(__dirname, './public')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/book', bookRouter);
app.use('/other', otherRouter);
app.use('/wallet', walletRouter);
app.use('/udisk', udiskRouter);
app.use('/person', personRouter);
app.use('/comment', commentRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
