const JoiBase = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');
const { joiPatternObjectId } = require('./common');
const { commonSchema } = require('./common');
const Project = require('../../models/project');

const Joi = JoiBase.extend(JoiDate);

const project = {
  postProject: Joi.object({
    name: Joi.string().required(),
    pm: joiPatternObjectId.required(),
    am: joiPatternObjectId.required(),
    color: Joi.string().required(),
    notes: Joi.string().required(),
    created: Joi.date(),
    active: Joi.bool(),
  }),
  projectObjectID: commonSchema.objectId(Project),

};
module.exports = project;
