const mongoose = require('mongoose');

const { Schema } = mongoose;

const Project = new Schema({
  name: {
    type: String,
    required: true
  },
  pm: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  am: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  color: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  },
  active: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model('Project', Project);
