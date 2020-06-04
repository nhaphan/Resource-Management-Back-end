const { middleware, objectIdParamsValidate } = require('../routeValidate.middleware');
const { REQ } = require('../../helpers/constant');
const bookingJoi = require('../../helpers/joiSchema/booking');

const bodyBookingValidate = middleware(bookingJoi.bookingUpdateAndDelete, REQ.BODY);
const getDurationBookingValidate = middleware(bookingJoi.duration, REQ.PARAMS);
const bookingObjectIdValidate = objectIdParamsValidate(bookingJoi.bookingObjectID);

module.exports = {
  bodyBookingValidate,
  getDurationBookingValidate,
  bookingObjectIdValidate
};
