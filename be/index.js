require("dotenv").config();
const express = require("express");
const logger = require("./src/logger/logger");
const setupMiddleware = require("./src/utils/middleware");
const connectMongooses = require("./src/utils/mongo");
const UserRouter = require("./src/routes/auth");
const RideHistoryRouter = require("./src/routes/statistic");
const RideRouter = require("./src/routes/driver");

const app = express();
const port = process.env.PORT || 3000;

setupMiddleware(app);

app.use("/user", UserRouter);
app.use("/statistic", RideHistoryRouter);
app.use("/driver", RideRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

const startServer = async () => {
  await connectMongooses();
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

startServer();
