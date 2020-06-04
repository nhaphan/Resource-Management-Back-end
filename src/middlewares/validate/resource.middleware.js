const { middleware, objectIdParamsValidate } = require('../routeValidate.middleware');
const { REQ } = require('../../helpers/constant');
const resourceJoi = require('../../helpers/joiSchema/resource');

const bodyResourceValidate = middleware(resourceJoi.postResource, REQ.BODY);
const registerValidate = middleware(resourceJoi.createResource, REQ.BODY);
const resourceObjectIdValidate = objectIdParamsValidate(resourceJoi.resourceObjectID);

module.exports = {
  bodyResourceValidate,
  resourceObjectIdValidate,
  registerValidate
};
