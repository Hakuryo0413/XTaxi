const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const setupMiddleware = require("./src/utils/middleware");
const connectMongooses = require("./src/utils/mongo");
const logger = require("./src/utils/logger")
const UserRouter = require("./src/routes/user");
const RideHistoryRouter = require("./src/routes/rideHistory");
const DriverRouter = require("./src/routes/driver");
//connect to database
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

setupMiddleware(app);

app.use("/user", UserRouter);
app.use("/rideHistory", RideHistoryRouter);
app.use("/driver", DriverRouter);
// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Sample routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    status: "active",
  });
});

const startServer = async () => {
  await connectMongooses();
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

startServer();
