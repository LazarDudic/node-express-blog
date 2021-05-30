const { Router } = require('express');
const { check } = require('express-validator');
const blogController = require('../app/controllers/BlogController');
const { BlogImageFileTypes } = require('../app/validator');
const { isAuthenticated } = require('../app/middleware/auth');
const blogRouter = Router();

blogRouter.use(isAuthenticated);
blogRouter.get('/index', (req, res) => {
    return res.render('admin/blog/index', {
      title: 'Blogs',
  });
});

blogRouter.get('/create', blogController.create)
blogRouter.post('/create', [
    check('title')
        .notEmpty().withMessage('Title is required.'),
    check('body')
    .notEmpty().withMessage('Body is required.'),
    check('image')
        .custom(BlogImageFileTypes)
        .optional({ nullable: true }),
    ], blogController.createPost);

module.exports = blogRouter;