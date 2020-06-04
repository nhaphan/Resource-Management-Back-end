const httpStatus = require('http-status');

const projectService = require('../../services/project.service');

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects();
    return res.status(httpStatus.OK).json({ projects });
  } catch (err) {
    return next(err);
  }
};
exports.getProjectsDetails = async (req, res, next) => {
  try {
    const projects = await projectService.getProjectsDetail();
    return res.status(httpStatus.OK).json({ projects });
  } catch (err) {
    return next(err);
  }
};
exports.getProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const project = await projectService.getProject(projectId);
    return res.status(httpStatus.OK).json({ project });
  } catch (err) {
    return next(err);
  }
};

exports.addProject = async (req, res, next) => {
  try {
    const project = req.body;
    const newProject = await projectService.createProject(project);
    return res
      .status(httpStatus.CREATED)
      .json({ message: 'Adding project is OK', data: { project: newProject } });
  } catch (err) {
    return next(err);
  }
};
exports.updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = req.body;
    await projectService.updateProject(projectId, project);
    return res
      .status(httpStatus.OK)
      .json({ message: `Update project is OK with project id: ${projectId}` });
  } catch (err) {
    return next(err);
  }
};
exports.deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    await projectService.deleteProject(projectId);
    return res
      .status(httpStatus.OK)
      .json({ message: ` Delete OK with project id: ${projectId}` });
  } catch (err) {
    return next(err);
  }
};
