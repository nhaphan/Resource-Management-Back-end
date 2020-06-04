/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const authService = require('../../services/auth.service');
const resourceService = require('../../services/resource.service');
const { auth } = require('../../config');
const { validateRole } = require('../../helpers/validate/userValidate');


const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authService.getUser(email, password);
    const payload = {
      id: user.id,
      email: user.email,
      avatar: user.avatar
    };
    const token = jwt.sign(payload, 'secret', {
      expiresIn: auth.expireIn
    });
    return res.status(httpStatus.OK).json({
      succcess: true,
      token: `Bearer ${token}`,
      role: Math.max(...user.roles),
    });
  } catch (err) {
    return next(err);
  }
};
const me = async (req, res, next) => {
  const { id } = req.user;
  try {
    const resource = await resourceService.getResourceByUser(id);
    return res.status(httpStatus.OK).json(resource);
  } catch (err) {
    return next(err);
  }
};
const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.createUser(email, password);
    return res.status(httpStatus.OK).json(user);
  } catch (err) {
    return next(err);
  }
};
const grantPermission = async (req, res, next) => {
  const { resourceId, role } = req.body;
  const { user } = req;
  try {
    const formatRole = validateRole(role);
    await authService.updateRole(resourceId, user._id, formatRole);
    return res.status(httpStatus.OK).json({ message: `Grant permission ${role} is success`, resourceId });
  } catch (err) {
    return next(err);
  }
};


module.exports = {
  login,
  me,
  register,
  grantPermission
};
