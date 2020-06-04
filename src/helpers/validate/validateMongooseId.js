const mongoose = require('mongoose');
const { BadRequest } = require('../errors/BadRequest');

const validateMongooseId = (id, Type) => {
  const isId = mongoose.Types.ObjectId.isValid(id);
  if (!isId) {
    throw new BadRequest(`${Type}Id is not valid with value:${id}`);
  }
  return isId;
};
module.exports = validateMongooseId;
