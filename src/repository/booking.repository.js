const moment = require('moment');

const Repository = require('./entity');
const Booking = require('../models/booking');
const { getNumberOfDay, getBusinessDatesCount } = require('../helpers/util');

const bookingEntity = new Repository(Booking);

const create = async (booking) => {
  const newBooking = await bookingEntity.create(booking);
  return newBooking;
};
const get = async (id) => {
  const booking = await bookingEntity.find({ _id: id });
  return booking;
};
const list = async (query = {}, options = {}) => {
  const populated = {
    path: 'project',
    select: 'name color',
  };
  const bookings = await bookingEntity.find(query, options, populated);
  return bookings;
};
const remove = async (id) => {
  const booking = await bookingEntity.remove({ _id: id });
  return booking;
};
const update = async (bookingId, booking) => {
  const updatedBooking = await bookingEntity.update({ _id: bookingId }, booking);
  return updatedBooking;
};
const statistic = async (start, end, resource) => {
  const length = getBusinessDatesCount(start, end);
  console.log(length, end, start);
  const totalHours = length * 8;
  const query = {
    startDay: { $gte: moment(start).toDate() },
    endDay: { $lte: moment(end).toDate() },
    resourceId: resource
  };
  const bookingByResource = await bookingEntity.find(query);
  const result = {
    totalSchedule: 0,
    unscheduled: 0,
    utilization: 0
  };
  const calculateTotalScheduleAndUtil = booking => {
    const startDay = moment(booking.startDay);
    const endDay = moment(booking.endDay);
    result.totalSchedule += (getNumberOfDay(startDay, endDay) * booking.utilize * 8) / 100;
    result.utilization += booking.utilize;
    return booking;
  };
  bookingByResource.map(calculateTotalScheduleAndUtil);
  result.unscheduled = totalHours - result.totalSchedule;
  result.utilization = Math.round(result.utilization / length);
  // eslint-disable-next-line no-underscore-dangle
  return { resourceId: resource._id, ...result };
};

module.exports = {
  create,
  remove,
  get,
  list,
  update,
  statistic
};
