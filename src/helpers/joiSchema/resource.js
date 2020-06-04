const Joi = require('@hapi/joi');
const { commonSchema } = require('./common');
const Resource = require('../../models/resource');

const resource = {
  createResource: Joi.object({
    name: {
      first: Joi.string(),
      last: Joi.string()
    },
    jobtitle: Joi.string(),
    department: Joi.string(),
    avatar: Joi.string(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    user: Joi.string(),
  }),
  postResource: Joi.object({
    name: {
      first: Joi.string().required(),
      last: Joi.string().required()
    },
    jobtitle: Joi.string().required(),
    avatar: Joi.string().required(),
    department: Joi.string().required(),
    user: Joi.string(),
  }),
  resourceObjectID: commonSchema.objectId(Resource),

};
module.exports = resource;
