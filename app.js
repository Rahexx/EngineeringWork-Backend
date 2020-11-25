var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.db, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var indexRouter = require('./routes/index');
var logInRouter = require('./routes/logIn');
var signUpRouter = require('./routes/signUp');
var adminRouter = require('./routes/admin');
var listRoomsRouter = require('./routes/listRooms');
var favouritesRouter = require('./routes/favourites');
var searchUserRouter = require('./routes/searchUsers');
var messagesRouter = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  }),
);

app.use('/', indexRouter);
app.use('/logIn', logInRouter);
app.use('/signUp', signUpRouter);
app.use('/admin', adminRouter);
app.use('/listRooms', listRoomsRouter);
app.use('/favourites', favouritesRouter);
app.use('/searchUsers', searchUserRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
