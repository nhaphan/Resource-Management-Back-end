const Joi = require('@hapi/joi');
const { commonSchema } = require('./common');
const Job = require('../../models/jobtitle');

const job = {
  updateAndPostBody: Joi.object({
    name: Joi.string().required(),
  }),
  jobObjectID: commonSchema.objectId(Job),

};
module.exports = job;
