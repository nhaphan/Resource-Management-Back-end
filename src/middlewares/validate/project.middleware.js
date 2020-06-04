const { middleware, objectIdParamsValidate } = require('../routeValidate.middleware');
const { REQ } = require('../../helpers/constant');
const projectJoi = require('../../helpers/joiSchema/project');

const bodyProjectValidate = middleware(projectJoi.postProject, REQ.BODY);
const projectObjectIdValidate = objectIdParamsValidate(projectJoi.projectObjectID);

module.exports = {
  bodyProjectValidate,
  projectObjectIdValidate
};
