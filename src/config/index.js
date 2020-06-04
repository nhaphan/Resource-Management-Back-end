const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
module.exports = {
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  databaseURL: process.env.MONGODB_URI,
  api: {
    prefix: '/api'
  },
  cache: {
    // save cache last one day
    durationList: 60 * 60 * 24,
    // save cache item last 10p
    durationItem: 60 * 10
  },
  auth: {
    expireIn: 60 * 60 * 24,
  },
  saltRounds: 10,
};
