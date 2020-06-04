const Repository = require('./entity');
const Department = require('../models/department');

const departmentEntity = new Repository(Department);

const create = async (department) => {
  const newDepartment = await departmentEntity.create(department);
  return newDepartment;
};
const get = async (id) => {
  const department = await departmentEntity.find({ _id: id });
  return department;
};
const list = async () => {
  const departments = await departmentEntity.find();
  return departments;
};
const remove = async (id) => {
  const department = await departmentEntity.remove({ _id: id });
  return department;
};
const update = async (departmentId, department) => {
  const updatedBooking = await departmentEntity.update({ _id: departmentId }, department);
  return updatedBooking;
};

module.exports = {
  create,
  remove,
  get,
  list,
  update
};
