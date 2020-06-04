
const bcrypt = require('bcryptjs');

const resouceService = require('./resource.service');
const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { BadRequest } = require('../helpers/errors/BadRequest');
const userHelper = require('../helpers/userHelper');
const { Roles } = require('../config/permission');
const { saltRounds } = require('../config');

const UserRepository = require('../repository/user.repository');

exports.getUser = async (email, password) => {
  const user = await UserRepository.getUserByEmail(email);
  const isUserNotFound = !user;
  if (isUserNotFound) {
    throw new NotFoundError('Not found email', '');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest('Invalid password');
  }
  return user;
};
exports.createUser = async (email, password) => {
  const existUser = await UserRepository.getUserByEmail(email);
  if (existUser) {
    throw new BadRequest('User is exist');
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const newPassword = await bcrypt.hash(password, salt);

  const newUser = {
    email,
    password: newPassword,
  };
  const createdUser = await UserRepository.create(newUser);
  // eslint-disable-next-line no-underscore-dangle
  return { _id: createdUser._id, email: createdUser.email };
};
exports.updateRole = async (resourceId, userId, role) => {
  const higherUser = await UserRepository.getById(userId);
  if (!higherUser) {
    throw new BadRequest('userId is not found');
  }
  const user = await resouceService.getUser(resourceId);
  const isHigherRole = userHelper.getHighestRole(user.roles) <
  userHelper.getHighestRole(higherUser.roles) &&
   userHelper.getHighestRole(higherUser.roles) > role;
  let roles = Object.values(Roles);

  if (!isHigherRole) {
    throw new BadRequest('User don\'t have permission');
  }

  const filterRoleEqualOrSmaller = r => r <= role;
  roles = roles.filter(filterRoleEqualOrSmaller);
  user.roles = roles;
  // eslint-disable-next-line no-underscore-dangle
  await UserRepository.update(user._id, user);
};
