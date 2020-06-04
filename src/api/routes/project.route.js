const express = require('express');
const { checkIsInRole, checkAuthentication } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../config/permission');
const projectController = require('../controllers/project.controller');

const { bodyProjectValidate, projectObjectIdValidate } = require('../../middlewares/validate/project.middleware');

const router = express.Router();

const resourceRoute = app => {
  app.use('/project', checkAuthentication, router);
  router.get('/get', projectController.getProjects);
  router.get('/detail/person', projectController.getProjectsDetails);
  router.get('/get/:projectId', projectObjectIdValidate, projectController.getProject);
  router.post('/add', checkIsInRole(Roles.Manager), projectController.addProject);
  router.put('/update/:projectId', projectObjectIdValidate, bodyProjectValidate, checkIsInRole(Roles.Manager), projectController.updateProject);
  router.delete('/delete/:projectId', projectObjectIdValidate, checkIsInRole(Roles.Manager), projectController.deleteProject);
  return router;
};
module.exports = resourceRoute;
