const Repository = require('./entity');
const Resource = require('../models/resource');

const resourceEntity = new Repository(Resource);

const create = async (resource) => {
  const newResource = await resourceEntity.create(resource);
  return newResource;
};
const get = async (id) => {
  const populated = {
    path: 'user'
  };
  const resource = await resourceEntity.find({ _id: id }, { multiple: false }, populated);
  return resource;
};
const list = async (query = {}, options = {}) => {
  const populated = {
    path: 'department user jobtitle',
    select: 'name roles'
  };
  const resources = await resourceEntity.find(query, options, populated);
  return resources;
};
const remove = async (id) => {
  const resource = await resourceEntity.remove({ _id: id });
  return resource;
};
const update = async (resourceId, resource) => {
  const updatedResource = await resourceEntity.update({ _id: resourceId }, resource);
  return updatedResource;
};
const getResourceByUser = async (user) => {
  const resource = await resourceEntity.find({ user });
  return resource;
};


module.exports = {
  create,
  remove,
  get,
  list,
  update,
  getResourceByUser,
};
