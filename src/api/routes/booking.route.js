const express = require('express');

const bookingController = require('../controllers/booking.controller');

const router = express.Router();
const {
  checkIsInRole,
  checkAuthentication
} = require('../../middlewares/auth.middleware');
const {
  getDurationBookingValidate,
  bodyBookingValidate,
  bookingObjectIdValidate
} = require('../../middlewares/validate/booking.middleware');
const { Roles } = require('../../config/permission');

const bookingRoute = (app) => {
  app.use('/booking', checkAuthentication, router);
  router.get('/get', bookingController.getBookings);
  router.get(
    '/get/:bookingId',
    bookingObjectIdValidate,
    bookingController.getBooking
  );
  router.get(
    '/get/:startDay/:endDay',
    getDurationBookingValidate,
    bookingController.getBookingByDuration
  );
  router.post(
    '/add',
    bodyBookingValidate,
    checkIsInRole(Roles.Manager),
    bookingController.addBooking
  );
  router.put(
    '/update/:bookingId',
    bookingObjectIdValidate,
    bodyBookingValidate,
    checkIsInRole(Roles.Manager),
    bookingController.updateBooking
  );
  router.delete(
    '/delete/:bookingId',
    bookingObjectIdValidate,
    checkIsInRole(Roles.Manager),
    bookingController.deleteBooking
  );
  router.get('/statistic/:start/:end', bookingController.statisticBooking);
  return router;
};
module.exports = bookingRoute;
