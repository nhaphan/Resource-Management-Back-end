const passport = require('passport');
const { BadRequest } = require('../helpers/errors/BadRequest');

const checkIsInRole = (role = 0) => (req, res, next) => {
  if (!req.user) {
    throw new BadRequest('User is not appreciate');
  }
  const hasRole = req.user.roles.find(r => r === role);
  if (!hasRole) {
    throw new BadRequest('User don\'t have permission');
  }
  return next();
};
const checkAuthentication = passport.authenticate('jwt', { session: false });
module.exports = {
  checkIsInRole,
  checkAuthentication
};
