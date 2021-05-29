const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../app/models/User');


function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
      
    const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect Email.' });
      }
      if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
        return done(null, false, { message: 'Password incorrect' });
        }
  }

  const findById = async (id) => await User.findById(id);

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => { 
      User.findById(id, (err, user) => done(err, user)); 
    });}

module.exports = initialize;