require('dotenv').config()
const express = require('express');
const session = require('express-session');
const flash = require('express-flash')
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true
}));

mongoose.connect(process.env.DB, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

const initializePassport = require('./config/passport');
initializePassport(passport);

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/AuthRoutes');
const adminRoutes = require('./routes/AdminRoutes');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Global middleware
app.use(function(req, res, next){
    global.authUser = req.user;
    next();
});

app.get('/', (req, res) => {
    res.render('home', {
      title: 'Home',
  });
});

app.use('/admin', adminRoutes);
app.use('', authRoutes);

app.listen(process.env.PORT);