const Project = require('../../models/project');
const { NotFoundError } = require('../errors/NotFoundError');
const { InternalError } = require('../errors/InternalError');
const validateMongooseId = require('./validateMongooseId');
const { verifyResourceExists } = require('./ResourceValidate');


const ProjectType = Project.collection.collectionName.slice(0, -1);
exports.verifyProjectExists = async (projectId) => {
  let project;
  await validateMongooseId(projectId, ProjectType);
  try {
    project = await Project.find({ _id: projectId, active: true });
  } catch (error) {
    throw new InternalError(error);
  }
  if (project === null) {
    throw new NotFoundError('Project', { projectId });
  }
  return project;
};
exports.verifyProject = async (project, projectId) => {
  const isNotNewProject = projectId !== undefined;
  if (isNotNewProject) {
    this.verifyProjectExists(projectId);
  }
  const { am, pm } = project;
  await verifyResourceExists(am);
  await verifyResourceExists(pm);
};
