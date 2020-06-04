const Repository = require('./entity');
const User = require('../models/user');

const userEntity = new Repository(User);

const create = async (user) => {
  const newUser = await userEntity.create(user);
  return newUser;
};
const getUserByEmail = async (email) => {
  const query = {
    email,
  };
  const user = await userEntity.find(query, { multiple: false });
  return user;
};
const getById = async (userId) => {
  const user = await userEntity.find({ _id: userId }, { multiple: false });
  return user;
};
const list = async (query = {}, options = {}) => {
  const users = await userEntity.find(query, options);
  return users;
};
const remove = async (id) => {
  const user = await userEntity.remove({ _id: id });
  return user;
};
const update = async (userId, user) => {
  const updatedUser = await userEntity.update({ _id: userId }, user);
  return updatedUser;
};

module.exports = {
  create,
  remove,
  getUserByEmail,
  list,
  update,
  getById
};
