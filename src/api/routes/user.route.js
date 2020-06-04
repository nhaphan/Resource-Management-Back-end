const express = require('express');

const authController = require('../controllers/auth.controller');
const { checkIsInRole, checkAuthentication } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../config/permission');

const router = express.Router();

const authRoute = app => {
  app.use('/auth', router);
  router.post('/login', authController.login);
  router.get('/me', checkAuthentication, authController.me);
  router.post('/register', authController.register);
  router.post('/role/grant', checkAuthentication, checkIsInRole(Roles.Admin), authController.grantPermission);
  return router;
};
module.exports = authRoute;
