const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model('role', RoleSchema);
