const Repository = require('./entity');
const Project = require('../models/project');

const projectEntity = new Repository(Project);

const create = async (project) => {
  const newProject = await projectEntity.create(project);
  return newProject;
};
const get = async (id) => {
  const project = await projectEntity.find({ _id: id }, { multiple: false });
  return project;
};
const list = async () => {
  const projects = await projectEntity.find();
  return projects;
};
const listDetail = async () => {
  const populated = {
    path: 'pm am',
    select: 'name avatar',
  };
  const projects = await projectEntity.find({}, {}, populated);
  return projects;
};
const remove = async (id) => {
  const project = await projectEntity.remove({ _id: id });
  return project;
};
const update = async (projectId, project) => {
  const updatedBooking = await projectEntity.update({ _id: projectId }, project);

  return updatedBooking;
};

module.exports = {
  create,
  remove,
  get,
  list,
  update,
  listDetail
};
