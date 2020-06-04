const HttpStatus = require('http-status');
const { BaseError } = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(content, query) {
    super(`${content}`);
    this.data = { content, query };
    this.status = HttpStatus.NOT_FOUND;
  }
}
module.exports.NotFoundError = NotFoundError;
