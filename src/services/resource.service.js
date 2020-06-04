const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { BadRequest } = require('../helpers/errors/BadRequest');
const userHelper = require('../helpers/userHelper');
const { isEmpty } = require('../helpers/util');


const ResourceRepository = require('../repository/resource.repository');
const UserRepository = require('../repository/user.repository');

exports.getResources = async () => {
  const resources = await ResourceRepository.list();

  const excludeRole = (resource) => ({
    ...resource,
    user: { role: Math.max(...resource.user.roles) }
  });
  const resourcesWithMaxRole = resources.map(excludeRole);
  return resourcesWithMaxRole;
};

exports.getResource = async (resourceId) => {
  const resource = await ResourceRepository.get(resourceId);
  if (isEmpty(resource)) {
    throw new NotFoundError(`Resource NOTFOUND the id:${resourceId}`, resourceId);
  }
  return resource;
};
exports.getResourceByUser = async (user) => {
  const resource = await ResourceRepository.getResourceByUser(user);
  if (isEmpty(resource)) {
    throw new NotFoundError(`Resource NOTFOUND the userId:${user}`, resource.user);
  }
  return resource;
};
exports.createResource = async (resource) => {
  const newResource = await ResourceRepository.create(resource);
  return newResource;
};
exports.updateResource = async (resourceId, resource, userId) => {
  const user = await UserRepository.getById(userId);
  const newResource = await ResourceRepository.get(resourceId);
  const resourceNotFound = !newResource;
  if (resourceNotFound) {
    throw new NotFoundError(
      `Resource NOT_FOUND with id: ${resourceId}`,
      resourceId
    );
  }
  if (!userHelper.isHigherRole(newResource, user)) {
    throw new BadRequest('Resource have role  euqal or higher than user');
  }
  const updatedResource = await ResourceRepository
    .update(resourceId, { ...newResource, ...resource });
  return updatedResource;
};
exports.saveImage = async (resourceId, avatar) => {
  const newResource = await ResourceRepository.update(
    resourceId,
    { avatar }
  );
  const resourceNotFound = !newResource;
  if (resourceNotFound) {
    throw new NotFoundError(
      `Resource NOT_FOUND with id: ${resourceId}`,
      resourceId
    );
  }
  return newResource;
};
exports.deleteResource = async (resourceId, userId) => {
  const user = await UserRepository.getById(userId);
  const resource = await ResourceRepository.get(resourceId);
  if (!resource) {
    throw new NotFoundError(`Resource NOTFOUND the id:${resourceId}`, resourceId);
  }
  if (!userHelper.isHigherRole(resource, user)) {
    throw new BadRequest('Resource shouldn\'t have role  euqal or higher than user');
  }
  await ResourceRepository.remove(resource);
  await UserRepository.remove(resource.user);
  return resource;
};
exports.getUser = async (resourceId) => {
  const resource = await this.getResource(resourceId);
  return resource.user;
};
exports.reportResource = async () => {

};
