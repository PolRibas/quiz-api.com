const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const helmet = require('helmet');
const xssFilter = require('x-xss-protection');
// const cors = require('cors')
const app = express();
require('dotenv').config();

app.use(cookieParser());

app.all('*', (req, res, next) => {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.setHeader('Access-Control-Allow-Origin', "https://www.nexow-platform.com");
    // res.header("Set-Cookie", "HttpOnly;Secure; SameSite=None");
    res.setHeader('Access-Control-Allow-Credentials', "true");
    // res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const uri = 'mongodb+srv://Pol:rcde1900B@cluster0-vntfb.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log(`Connected to database`);
})
.catch(error => {
  console.error(error, "theres AN ERROR");
});

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'adfjskahbdjkfjkdsb',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(helmet.frameguard());
app.use(xssFilter());
app.use(helmet.hsts({
  maxAge: 5184000
}));
app.use(helmet.noSniff());



const auth = require('./routes/auth');
const question = require('./routes/question');
  
app.use('/api/auth', auth);
app.use('/api/question', question);


app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send('error');
});
  
  // console.log('App is listening on port ' + port);
  
  module.exports = app;