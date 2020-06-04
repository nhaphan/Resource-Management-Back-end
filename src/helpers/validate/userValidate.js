const { Roles } = require('../../config/permission');
const BadRequest = require('../errors/BadRequest');
const { capitalizeFirstLetter } = require('../util');

const validateRole = (role) => {
  const formatRole = capitalizeFirstLetter(role);
  const isValidate = Object.keys(Roles).includes(
    capitalizeFirstLetter(formatRole)
  );
  if (!isValidate) {
    throw new BadRequest('Role is not includes');
  }
  return Roles[formatRole];
};

module.exports = {
  validateRole
};
