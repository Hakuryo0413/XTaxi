const cors = require("cors");
const bodyParser = require("body-parser");

const setupMiddleware = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = setupMiddleware;