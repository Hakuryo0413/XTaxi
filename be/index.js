const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter = require("./src/routes/user");
const RideHistoryRouter = require("./src/routes/rideHistory");
const RideRouter = require("./src/routes/driver");
//connect to database
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use("/user", UserRouter);
app.use("/rideHistory", RideHistoryRouter);
app.use("/driver", RideRouter);
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

// Start server
app.listen(port, () => {
  mongoose.connect("mongodb+srv://mvotx:mvotx2024rd1%40T@mvotxdb.foauf.mongodb.net/?retryWrites=true&w=majority&appName=mvotxdb");
  console.log(`Server is running on port ${port}`);
});
