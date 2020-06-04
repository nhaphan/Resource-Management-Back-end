const httpStatus = require('http-status');
const { REQ } = require('../helpers/constant');

const middleware = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: message });
  }
};
const objectIdParamsValidate = (schema) => middleware(schema, REQ.PARAMS);
module.exports = { middleware, objectIdParamsValidate };
