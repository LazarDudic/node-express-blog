const User = require('./models/User');

module.exports.UserEmailExists = async (email) => {
    const existingUser = await User.findOne({ email: email })         
    if (existingUser) {
        return Promise.reject('E-mail already in use.');
    }
}
