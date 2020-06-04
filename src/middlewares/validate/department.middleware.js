const { middleware, objectIdParamsValidate } = require('../routeValidate.middleware');
const { REQ } = require('../../helpers/constant');
const departmentJoi = require('../../helpers/joiSchema/department');

const bodyDepartmentValidate = middleware(departmentJoi.updateAndPostBody, REQ.BODY);
const departmentObjectIdValidate = objectIdParamsValidate(departmentJoi.departmentObjectID);

module.exports = {
  bodyDepartmentValidate,
  departmentObjectIdValidate,
};
