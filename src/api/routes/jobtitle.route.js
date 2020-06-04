const express = require('express');

const jobController = require('../controllers/jobtitle.controller');

const router = express.Router();
const { checkIsInRole, checkAuthentication } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../config/permission');

const { bodyJobValidate } = require('../../middlewares/validate/job.middleware');


const jobRoute = app => {
  app.use('/job', checkAuthentication, router);
  router.get('/get', jobController.getJobs);
  router.post('/add',
    bodyJobValidate,
    checkIsInRole(Roles.Admin),
    jobController.addJob);
  router.put('/update/:jobId',
    bodyJobValidate,
    checkIsInRole(Roles.Admin),
    jobController.updateJob);
  router.delete('/delete/:jobId',
    checkIsInRole(Roles.Admin),
    jobController.deleteJob);
  return router;
};
module.exports = jobRoute;
