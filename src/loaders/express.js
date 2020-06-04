const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const loaderPassport = require('./passport');

const routes = require('../api');
const config = require('../config');
const { internalError, notfoundError, unauthorizedError } = require('../middlewares/error.middleware');


module.exports = ({ app }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */

  // App use morgan to logger res
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );
  app.get('/', async (req, res) => {
    res.send('Hello World!');
  });

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(methodOverride());
  // Middleware that transforms the raw string of req.body into json

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());
  // Load API routes
  app.use(passport.initialize());
  loaderPassport(passport);

  app.use(config.api.prefix, routes());

  app.use(notfoundError);
  // error handlers
  app.use(unauthorizedError);
  // eslint-disable-next-line no-unused-vars
  app.use(internalError);
};
