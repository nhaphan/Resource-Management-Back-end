const Project = require('../models/project');
const { NotFoundError } = require('../helpers/errors/NotFoundError');
const { getTypeInMongo } = require('../helpers/util');
const { verifyProject } = require('../helpers/validate/ProjectValidate');

const { isEmpty } = require('../helpers/util');

const ProjectType = getTypeInMongo(Project);
const ProjectRepository = require('../repository/project.repository');

exports.getProjects = async () => {
  const projects = await ProjectRepository.list();
  return projects;
};
exports.getProjectsDetail = async () => {
  const projects = await ProjectRepository.listDetail();
  return projects;
};
exports.getProject = async (projectId) => {
  const project = await ProjectRepository.get(projectId);

  if (isEmpty(project)) {
    throw new NotFoundError(
      `NotFound: ${ProjectType} with id ${projectId}`,
      projectId
    );
  }
  return project;
};
exports.createProject = async (project) => {
  await verifyProject(project);
  const newResource = await ProjectRepository.create(project);
  return newResource;
};
exports.deleteProject = async (projectId) => {
  const project = await ProjectRepository.remove(projectId);
  if (isEmpty(project)) {
    throw new NotFoundError(`NotFound: project with id:${projectId}`, {
      _id: projectId
    });
  }
  return project;
};

exports.updateProject = async (projectId, project) => {
  const updatedProject = await ProjectRepository.update(projectId, project);
  const isProjectNotFound = !updatedProject;
  if (isProjectNotFound) {
    throw new NotFoundError(
      `Project NOT_FOUND with id: ${projectId}.`,
      projectId
    );
  }
  return updatedProject;
};
