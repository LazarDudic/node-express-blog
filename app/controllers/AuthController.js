const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports.loginGet = (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    });
}

module.exports.loginPost = (req, res) => {
    res.send('Logged in');
}

module.exports.registerGet = (req, res) => {
    res.render('auth/register', {
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
    user.password = req.body.password;
    try {
        user.save();
        res.redirect('/');
    } catch (err) {
        res.render('auth/register',  { error: err, title: 'Register' });
    }
}
