var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//directly require the .env file (created for mLab MongoDB account)
require('dotenv').config()

//session storage
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

//////////////////////////////////////////
// VIEW ENGINE
/////////////////////////////////////////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Mongodb Setup
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////////////
// SESSION STORAGE
/////////////////////////////////////////
//use sessions for tracking logins
app.use(session({
  secret: 'Caw caw',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, //30 day max age
  secure: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//custom flash middleware
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

//////////////////////////////////////////
// ROUTING
//////////////////////////////////////////

var homeRouter = require('./routes/home.js');
var usersRouter = require('./routes/users.js');
var queryRouter = require('./routes/queries.js');
var leadRouter = require('./routes/leads.js');
var dashboardRouter = require('./routes/dashboard.js');

app.use('/', homeRouter);
app.use('/query', queryRouter);
app.use('/lead', leadRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);


//////////////////////////////////////////

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
  res.render('error');
});

module.exports = app;
