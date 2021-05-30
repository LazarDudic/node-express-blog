const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports.loginGet = (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    });
}

module.exports.loginPost = passport.authenticate('local', 
    { 
        successRedirect: '/admin/dashboard',
        failureRedirect: '/login',
        failureFlash: true 
    });


module.exports.registerGet = (req, res) => {
    return res.render('auth/register', {
        title: 'Register'
    });
}

module.exports.registerPost = async (req, res) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.render('auth/register', { errors: valErrors.array(), title: 'Register' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User();
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = hashedPassword;
    try {
        user.save();
        return res.redirect('/login');
    } catch (err) {
        return res.render('auth/register',  { error: err, title: 'Register' });
    }
}

module.exports.logout = (req, res) => {
    req.logOut();
    return res.redirect('/login');
}
