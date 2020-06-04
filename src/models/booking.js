const mongoose = require('mongoose');

const { Schema } = mongoose;

const Booking = new Schema({
  startDay: {
    type: Date,
    required: true
  },
  endDay: {
    type: Date,
    required: true
  },
  utilize: {
    type: Number,
    default: 100
  },
  hour: {
    type: Number,
    default: 0
  },
  isDuration: {
    type: Boolean,
    default: false
  },
  details: {
    type: String
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  isOvertime: {
    type: Boolean,
    default: false
  },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
}, {
  toObject: {
    transform(doc, ret) {
      // eslint-disable-next-line no-param-reassign
      delete ret.active;
    }
  },
  toJSON: {
    transform(doc, ret) {
      // eslint-disable-next-line no-param-reassign
      delete ret.active;
    },

  }
}, { timestamps: true });


module.exports = mongoose.model('Booking', Booking);
