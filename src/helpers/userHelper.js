const getHighestRole = (roles) => Math.max(...roles);
const isHigherRole = (resource, user) => getHighestRole(resource.user.roles) <
 getHighestRole(user.roles);

module.exports = {
  getHighestRole,
  isHigherRole
};
