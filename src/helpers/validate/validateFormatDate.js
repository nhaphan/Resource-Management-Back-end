const moment = require('moment');
const { BadRequest } = require('../errors/BadRequest');


const validateFormatDate = date => {
  if (!moment(date, 'YYYY-MM-DD').isValid()) {
    throw new BadRequest(`Date is not valid with value:${date}`);
  }
  return date;
};
module.exports = validateFormatDate;
