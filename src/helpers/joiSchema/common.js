const Joi = require('@hapi/joi');
const { getTypeInMongo } = require('../../helpers/util');

const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const keyId = (str) => `${str}Id`;
const joiPatternObjectId = Joi.string().pattern(new RegExp(checkForHexRegExp));

const errorMessage = (message) => message;

const prepareObjectId = (model) => {
  const object = {};
  object[keyId(getTypeInMongo(model))] = joiPatternObjectId;
  return object;
};

const commonSchema = {
  objectId: (model) => Joi.object(prepareObjectId(model))
};
module.exports = { commonSchema, joiPatternObjectId, errorMessage };
