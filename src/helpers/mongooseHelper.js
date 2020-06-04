const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const castObjectId = (strId) => new ObjectId(strId);
module.exports = {
  castObjectId
};
