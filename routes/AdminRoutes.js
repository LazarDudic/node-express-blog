const { Router } = require('express');
const { isAuthenticated } = require('../app/middleware/auth');
const adminRouter = Router();

adminRouter.use(isAuthenticated);

adminRouter.get('/dashboard', (req, res) => {
    return res.render('admin/dashboard', {
      title: 'Dashboard',
  });
})

module.exports = adminRouter;
