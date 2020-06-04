const mongooseLoader = require('./mongoose');
const Logger = require('./logger');
const expressLoader = require('./express');

module.exports = async ({ expressApp }) => {
  await mongooseLoader();

  Logger.info(' DB load and connected');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
