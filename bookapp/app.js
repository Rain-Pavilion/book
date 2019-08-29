var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter=require('./routes/books');
var carRouter=require('./routes/car');
var session=require('express-session');

var app = express();


app.use(cookieParser());
app.use(session({
        secret:'我是地球人',
    /////////////////////
        resave:true,
    //////////////////////
        saveUninitialized:true,
        cookie:{
            maxAge:60*24*5*60*1000,
            secure:false,
        }
    }
));
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books',booksRouter);
app.use('/car',carRouter);

// catch 404 and forward to error handler
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
  res.sendFile(path.join(__dirname,'public','404.html'));
});

module.exports = app;
