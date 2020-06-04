const express = require('express');
const { checkAuthentication } = require('../../middlewares/auth.middleware');
const { resourceObjectIdValidate } = require('../../middlewares/validate/resource.middleware');
const resourceController = require('../controllers/resource.controller');
const { upload } = require('../../helpers/image');

const router = express.Router();

const imageRoute = app => {
  app.use('/image', router);
  router.get('/get/:imageId', upload.single('img'), resourceController.fetchImage);
  router.post('/add/:resourceId', checkAuthentication, resourceObjectIdValidate, upload.single('img'), resourceController.saveImage);
  return router;
};
module.exports = imageRoute;
