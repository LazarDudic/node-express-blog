const { Router } = require('express');
const authController = require('../app/controllers/AuthController');
const { check } = require('express-validator');
const { UserEmailExists } = require('../app/validator');
const { notAuthenticated, isAuthenticated } = require('../app/middleware/auth');
const authRouter = Router();

authRouter.delete('/logout', [isAuthenticated], authController.logout);
authRouter.use(notAuthenticated);
authRouter.get('/login', authController.loginGet);
authRouter.post('/login', authController.loginPost);
authRouter.get('/register', authController.registerGet);
authRouter.post('/register',[
    check('name')
        .notEmpty().withMessage('Name is required.')
        .bail()
        .isLength({ min: 2, max: 50}).withMessage('The length of Name is min 2 max 50.'),
    check('lastName')
        .notEmpty().withMessage('Last Name is required.')
        .bail()
        .isLength({ min: 2, max: 50}).withMessage('The length of Last Name is min 2 max 50.'),
    check('email')
        .notEmpty().withMessage('Email is required.')
        .bail()
        .normalizeEmail()
        .isEmail().withMessage('Email is invalid.')
        .custom(UserEmailExists),
    check('password')
        .notEmpty().withMessage('Password is required.')
        .bail()
        .isLength({ min: 6}).withMessage('Min lenght of password is 6 characters.'),
    check('passwordConfirmation')
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords did not match.'),
],
authController.registerPost);

module.exports = authRouter;
