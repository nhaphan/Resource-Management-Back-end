const Joi = require('@hapi/joi');
const { commonSchema } = require('./common');
const Department = require('../../models/department');

const department = {
  updateAndPostBody: Joi.object({
    name: Joi.string().required(),
  }),
  departmentObjectID: commonSchema.objectId(Department),

};
module.exports = department;
