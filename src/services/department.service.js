/* eslint-disable no-underscore-dangle */
const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { isEmpty } = require('../helpers/util');

const DepartmentRepository = require('../repository/department.repository');

exports.getDepartments = async () => {
  const departments = await DepartmentRepository.list();
  return departments;
};
exports.getDepartmentById = async departmentId => {
  const department = await DepartmentRepository.get(departmentId);
  if (isEmpty(department)) {
    throw new NotFoundError(`NotFound: Department with id ${departmentId}`, departmentId);
  }
  return department;
};

exports.deleteDepartment = async departmentId => {
  const department = await DepartmentRepository.remove(departmentId);
  if (isEmpty(department)) {
    throw new NotFoundError(`NotFound: Department with id ${departmentId}`, departmentId);
  }
  return department;
};
exports.updateDepartment = async (departmentId, department) => {
  const updatedDepartment = await DepartmentRepository.update(departmentId, department);
  if (isEmpty(department)) {
    throw new NotFoundError(`NotFound: Department with id ${departmentId}`, departmentId);
  }
  return updatedDepartment;
};
exports.createDepartment = async (department) => {
  const newDepartment = await DepartmentRepository.create(department);
  return newDepartment;
};
