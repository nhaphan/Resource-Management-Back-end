/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const validateFormatDate = require('../helpers/validate/validateFormatDate');
const ResourceValidate = require('../helpers/validate/ResourceValidate');
const ProjectValidate = require('../helpers/validate/ProjectValidate');
const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { isEmpty } = require('../helpers/util');
const BookingRepository = require('../repository/booking.repository');
const ResourceRepository = require('../repository/resource.repository');


exports.getBookings = async (query = {}) => {
  const bookings = await BookingRepository.list(query);
  return bookings;
};
exports.getBookingById = async (bookingId) => {
  const booking = await BookingRepository.get(bookingId);
  if (isEmpty(booking)) {
    throw new NotFoundError(`NotFound: Booking with id ${bookingId}`, bookingId);
  }
  return booking[0];
};
exports.getBookingsByMonth = async (month) => {
  const bookings = await this.getBookings();
  const bookingByMonth = bookings.filter((booking) => {
    const isBookingInMonth =
      booking.startDay.getMonth().toString() === month ||
      booking.endDay.getMonth().toString() === month;
    return isBookingInMonth;
  });
  return bookingByMonth;
};
exports.getBookingsByDuration = async (startDay, endDay) => {
  validateFormatDate(startDay);
  validateFormatDate(endDay);
  const query = {
    endDay: {
      $gte: moment(startDay)
    },
    startDay: {
      $lte: moment(endDay)
    },
  };
  const bookings = await this.getBookings(query);
  return bookings;
};
exports.deleteBooking = async (bookingId) => {
  const booking = await BookingRepository.remove(bookingId);
  const bookingNotFound = !booking;
  if (bookingNotFound) {
    throw new NotFoundError(`NotFound: Booking with id:${bookingId}`, bookingId);
  }
  return booking;
};
exports.updateBooking = async (bookingId, booking) => {
  const { project, resourceId } = booking;
  await ProjectValidate.verifyProjectExists(project._id);
  await ResourceValidate.verifyResourceExists(resourceId);
  const updatedBooking = await BookingRepository.update(bookingId, booking);
  const isBookingNotFound = !updatedBooking;
  if (isBookingNotFound) {
    throw new NotFoundError(`Booking with id:${bookingId}`, bookingId);
  }
  return updatedBooking;
};
exports.createBooking = async (booking) => {
  const { resourceId, project } = booking;

  await ProjectValidate.verifyProjectExists(project._id);
  await ResourceValidate.verifyResourceExists(resourceId);

  const newBooking = await BookingRepository.create(booking);

  return { ...newBooking.toJSON(), project };
};
exports.statisticBooking = async (start, end) => {
  const result = [];
  const resources = await ResourceRepository.list();
  await Promise.all(resources.map(async resource => {
    const resultByResource = await BookingRepository.statistic(start, end, resource);
    result.push(resultByResource);
  }));
  return result;
};
