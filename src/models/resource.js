const mongoose = require('mongoose');

const { Schema } = mongoose;

const resourceSchema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  avatar: {
    type: String,
    default:
      'https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg'
  },
  active: {
    default: true,
    select: false,
    type: Boolean,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    select: false
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'department',
  },
  jobtitle: {
    type: Schema.Types.ObjectId,
    ref: 'job',
  }
});

resourceSchema.virtual('fulllname').get(() => this.name.first + this.name.last);

module.exports = mongoose.model('Resource', resourceSchema);
