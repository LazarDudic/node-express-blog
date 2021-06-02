const { Router } = require('express');
const { check } = require('express-validator');
const categoryController = require('../app/controllers/categoryController');
const { isAuthenticated } = require('../app/middleware/auth');
const categoryRouter = Router();

categoryRouter.use(isAuthenticated);
categoryRouter.get('/index', categoryController.index);
categoryRouter.get('/create', categoryController.create)
categoryRouter.get('/edit/:slug', categoryController.edit)
categoryRouter.post('/create', [
    check('name')
        .notEmpty().withMessage('Name is required.'),
    ], categoryController.createPost);

categoryRouter.put('/edit/:slug', [
        check('name')
            .notEmpty().withMessage('Name is required.'),
        ], categoryController.update);

categoryRouter.delete('/delete/:slug', categoryController.delete);
    
module.exports = categoryRouter;