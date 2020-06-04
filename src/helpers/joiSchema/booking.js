const JoiBase = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');
const { DATE_FORMAT } = require('../constant');
const { commonSchema } = require('./common');
const Booking = require('../../models/booking');

const Joi = JoiBase.extend(JoiDate);
const booking = {
  bookingUpdateAndDelete: Joi.object({
    startDay: Joi.date().required(),
    endDay: Joi.date().required(),
    utilize: Joi.number().required(),
    hour: Joi.number(),
    isDuration: Joi.bool(),
    details: Joi.string(),
    project: {
      _id: Joi.string().required(),
    },
    resourceId: Joi.string().required(),
  }),
  duration: Joi.object({
    startDay: Joi.date().format(DATE_FORMAT),
    endDay: Joi.date().format(DATE_FORMAT),
  }),
  bookingObjectID: commonSchema.objectId(Booking),
};
module.exports = booking;
