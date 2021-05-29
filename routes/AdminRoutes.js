const { Router } = require('express');
const { isAuthenticated } = require('../app/middleware/auth');
const adminRouter = Router();

adminRouter.use(isAuthenticated);

adminRouter.get('/home', (req, res) => {
    return res.render('admin/home', {
      title: 'Admin Page',
  });
})

module.exports = adminRouter;
