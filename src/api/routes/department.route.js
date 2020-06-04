const express = require('express');

const departmentController = require('../controllers/department.controller');

const router = express.Router();
const { checkIsInRole, checkAuthentication } = require('../../middlewares/auth.middleware');
const { bodyDepartmentValidate, departmentObjectIdValidate } = require('../../middlewares/validate/department.middleware');

const { Roles } = require('../../config/permission');

const departmentRoute = app => {
  app.use('/department', checkAuthentication, router);
  router.get('/get', departmentController.getDepartments);
  router.post('/add',
    bodyDepartmentValidate,
    checkIsInRole(Roles.Admin),
    departmentController.addDepartment);
  router.put('/update/:departmentId',
    departmentObjectIdValidate,
    bodyDepartmentValidate,
    checkIsInRole(Roles.Admin),
    departmentController.updateDepartment);
  router.delete('/delete/:departmentId',
    departmentObjectIdValidate,
    checkIsInRole(Roles.Admin),
    departmentController.deleteDepartment);
  return router;
};
module.exports = departmentRoute;
