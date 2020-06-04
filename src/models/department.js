const mongoose = require('mongoose');

const DeparmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('department', DeparmentSchema);
