const Logger = require('../loaders/logger');
const { InternalError } = require('../helpers/errors/InternalError');
const { NotFoundError } = require('../helpers/errors/NotFoundError');

// eslint-disable-next-line no-unused-vars
const internalError = (err, req, res, next) => {
  if (!err.status) {
    // eslint-disable-next-line no-param-reassign
    Logger.error(err);
    // eslint-disable-next-line no-param-reassign
    err = new InternalError('Server is internal error');
  }
  res.status(err.status);
  res.json({
    errors: {
      message: err.message
    }
  }).end();
};
const notfoundError = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res
      .status(err.status)
      .send({ errors: { message: err.message, data: err.data.query } })
      .end();
  }
  return next(err);
};
const unauthorizedError = (err, req, res, next) => {
  /**
     * Handle 401 thrown by express-jwt library
     */
  if (err.name === 'UnauthorizedError') {
    return res
      .status(err.status)
      .send({ message: err.message })
      .end();
  }
  return next(err);
};
module.exports = {
  internalError,
  notfoundError,
  unauthorizedError
};
