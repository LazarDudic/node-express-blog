
module.exports.isAuthenticated = (req, res, next) => {
    if (! req.isAuthenticated()) {
        return res.redirect('/');
    }

    next();
}

module.exports.notAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}