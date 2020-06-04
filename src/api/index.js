const { Router } = require('express');

const booking = require('./routes/booking.route');
const resource = require('./routes/resouce.route');
const project = require('./routes/project.route');
const department = require('./routes/department.route');
const job = require('./routes/jobtitle.route');
const auth = require('./routes/user.route');
const image = require('./routes/image.route');

module.exports = () => {
  const app = Router();

  // Adding route
  booking(app);
  resource(app);
  project(app);
  job(app);
  department(app);
  auth(app);
  image(app);

  return app;
};
