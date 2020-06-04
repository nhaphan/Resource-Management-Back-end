const Resource = require('../../models/resource');
const { NotFoundError } = require('../errors/NotFoundError');
const validateMongooseId = require('./validateMongooseId');

const ResourceType = Resource.collection.collectionName.slice(0, -1);
exports.verifyResourceExists = async (resourceId) => {
  await validateMongooseId(resourceId, ResourceType);
  let resource;
  try {
    resource = await Resource.find({ _id: resourceId, active: true });
  } catch (error) {
    return error;
  }
  if (resource === null) {
    throw new NotFoundError('Resource', { resourceId });
  }
  return resource;
};
