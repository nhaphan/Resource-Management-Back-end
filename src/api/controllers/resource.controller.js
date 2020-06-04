const httpStatus = require('http-status');

const { getImage } = require('../../helpers/image');
const reosurceService = require('../../services/resource.service');
const authService = require('../../services/auth.service');

const getResources = async (req, res, next) => {
  try {
    const resources = await reosurceService.getResources();
    return res.status(httpStatus.OK).json({ resources });
  } catch (err) {
    return next(err);
  }
};

const getResource = async (req, res, next) => {
  const { resourceId } = req.params;

  try {
    const resource = await reosurceService.getResource(resourceId);
    return res.status(httpStatus.OK).json({ resource });
  } catch (err) {
    return next(err);
  }
};

const addResource = async (req, res, next) => {
  try {
    const {
      email, password, name, jobtitle, department
    } = req.body;
    const newUser = await authService.createUser(email, password);
    const resource = {
      name, jobtitle, user: newUser, department
    };
    await reosurceService.createResource(resource);
    return res.status(httpStatus.OK).json({ message: 'Adding resoruce is OK', resource });
  } catch (err) {
    return next(err);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const { resourceId } = req.params;
    const { id } = req.user;
    await reosurceService.updateResource(resourceId, req.body, id);
    return res
      .status(httpStatus.OK)
      .json({
        message: `Update resource is OK with resource id: ${resourceId}`
      });
  } catch (err) {
    return next(err);
  }
};

// eslint-disable-next-line consistent-return
const saveImage = async (req, res, next) => {
  try {
    const { resourceId } = req.params;
    console.log(req.file);
    const idImage = req.file.id;
    reosurceService.saveImage(resourceId, idImage);
    res.status(httpStatus.CREATED).send();
  } catch (err) {
    return next(err);
  }
};
// eslint-disable-next-line consistent-return
const fetchImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const readstream = await getImage(imageId);
    readstream.pipe(res);
  } catch (err) {
    return next(err);
  }
};

const deleteResource = async (req, res, next) => {
  const { resourceId } = req.params;
  const { id } = req.user;
  try {
    await reosurceService.deleteResource(resourceId, id);
    return res.status(200).json({ message: 'Delete Resource is  OK' });
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  getResource,
  getResources,
  deleteResource,
  updateResource,
  addResource,
  saveImage,
  fetchImage
};
