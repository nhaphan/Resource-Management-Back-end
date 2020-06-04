const Resource = require('../models/resource');

exports.buildResourceFromRequest = req => {
  const {
    name, permission, email, jobtitle, avatar
  } = req.body;
  const resource = new Resource();
  resource.name = name;
  resource.permission = permission;
  resource.email = email;
  resource.jobtitle = jobtitle;
  resource.avatar = avatar;

  return resource;
};
