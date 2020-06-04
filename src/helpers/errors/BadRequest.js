const HttpStatus = require('http-status');
const { BaseError } = require('./BaseError.js');

class BadRequest extends BaseError {
  constructor(message) {
    super(message);
    this.data = { message };
    this.status = HttpStatus.BAD_REQUEST;
  }
}
module.exports.BadRequest = BadRequest;
