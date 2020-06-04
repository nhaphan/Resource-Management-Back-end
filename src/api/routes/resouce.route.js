const express = require('express');
const { checkIsInRole, checkAuthentication } = require('../../middlewares/auth.middleware');
const { bodyResourceValidate, resourceObjectIdValidate, registerValidate } = require('../../middlewares/validate/resource.middleware');
const { Roles } = require('../../config/permission');
const resourceController = require('../controllers/resource.controller');
const { upload } = require('../../helpers/image');

const router = express.Router();

const resourceRoute = app => {
  app.use('/resource', checkAuthentication, router);
  router.get('/get', resourceController.getResources);
  router.get('/get/:resourceId', resourceObjectIdValidate, resourceController.getResource);
  router.post('/add', registerValidate, checkIsInRole(Roles.Admin), resourceController.addResource);
  router.get('/get/image/:imageId', upload.single('img'), resourceController.fetchImage);
  router.post('/add/image/:resourceId', resourceObjectIdValidate, upload.single('img'), resourceController.saveImage);
  router.put('/update/:resourceId', resourceObjectIdValidate, bodyResourceValidate, checkIsInRole(Roles.Admin), resourceController.updateResource);
  router.delete('/delete/:resourceId', resourceObjectIdValidate, checkIsInRole(Roles.Admin), resourceController.deleteResource);
  return router;
};
module.exports = resourceRoute;
