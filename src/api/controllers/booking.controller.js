const httpStatus = require('http-status');

const moment = require('moment');
const bookingService = require('../../services/booking.service');

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getBookings();
    return res.status(httpStatus.OK).json({ bookings });
  } catch (err) {
    return next(err);
  }
};

exports.getBooking = async (req, res, next) => {
  const { bookingId } = req.params;

  try {
    const booking = await bookingService.getBookingById(bookingId);
    return res.status(httpStatus.OK).json({ booking });
  } catch (err) {
    return next(err);
  }
};

exports.getBookingByDuration = async (req, res, next) => {
  const { startDay, endDay } = req.params;
  try {
    const bookingsByDuration = await bookingService.getBookingsByDuration(
      startDay,
      endDay
    );
    return res.status(httpStatus.OK).json({ bookings: bookingsByDuration });
  } catch (err) {
    return next(err);
  }
};

exports.addBooking = async (req, res, next) => {
  try {
    const booking = req.body;
    booking.startDay = moment(booking.startDay.toString());
    booking.endDay = moment(booking.endDay.toString());
    const newBooking = await bookingService.createBooking(booking);
    return res
      .status(httpStatus.OK)
      .json({ message: 'Adding booking is OK', booking: newBooking });
  } catch (err) {
    return next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    await bookingService.updateBooking(bookingId, req.body);
    return res
      .status(httpStatus.OK)
      .json({ message: `Update booking is OK with booking id: ${bookingId}` });
  } catch (err) {
    return next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    await bookingService.deleteBooking(bookingId);
    return res
      .status(httpStatus.OK)
      .json({ message: ` Delete OK with booking id: ${bookingId}` });
  } catch (err) {
    return next(err);
  }
};
exports.statisticBooking = async (req, res, next) => {
  try {
    const { start, end } = req.params;
    const [startMoment, endMoment] = [moment(start.toString()),
      moment(end.toString())];
    const result = await bookingService.statisticBooking(startMoment, endMoment);
    return res
      .status(httpStatus.OK)
      .json({ message: 'Statistic schedules', data: result });
  } catch (err) {
    return next(err);
  }
};
