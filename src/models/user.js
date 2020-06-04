const mongoose = require('mongoose');
const { Roles } = require('../config/permission');

const { Schema } = mongoose;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  roles: {
    type: Array,
    default: [Roles.User]
  },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);
