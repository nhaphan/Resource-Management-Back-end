const HttpStatus = require('http-status');
const { BaseError } = require('./BaseError');

class InternalError extends BaseError {
  constructor(error) {
    super('Server is internal error');
    this.data = { error };
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
module.exports.InternalError = InternalError;
