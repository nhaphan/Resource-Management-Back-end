const Booking = require('../models/booking');

exports.buildBookingFromRequest = req => {
  const {
    startDay, endDay, isDuration, details
  } = req.body;
  const booking = new Booking();

  booking.startDay = startDay;
  booking.endDay = endDay;
  booking.isDuration = isDuration;
  booking.details = details;

  return booking;
};
