const User = require('./models/User');
const path = require('path');

module.exports.UserEmailExists = async (email) => {
    const existingUser = await User.findOne({ email: email })         
    if (existingUser) {
        return Promise.reject('E-mail already in use.');
    }
}

module.exports.BlogImageFileTypes = async (file, { req }) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(req.files.image.name).toLowerCase());

    if (! extname) {
        return Promise.reject('Image can only be jpeg,jpg or png.');
    }
  }
