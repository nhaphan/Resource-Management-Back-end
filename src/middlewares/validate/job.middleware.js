const { middleware, objectIdParamsValidate } = require('../routeValidate.middleware');
const { REQ } = require('../../helpers/constant');
const jobJoi = require('../../helpers/joiSchema/job');

const bodyJobValidate = middleware(jobJoi.updateAndPostBody, REQ.BODY);
const jobObjectIdValidate = objectIdParamsValidate(jobJoi.jobObjectIdValidate);

module.exports = {
  bodyJobValidate,
  jobObjectIdValidate,
};
