const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

// @route   POST /api/driver/register
// @desc    Register new driver with vehicle
// @access  
router.post("/register", driverController.registerDriver);

// @route   GET /api/driver/all
// @desc    Get all drivers with their vehicles
// @access  Private (Admin only)
router.get("/all", driverController.getAllDrivers);

// @route   GET /api/driver/:id
// @desc    Get specific driver with vehicle info
// @access  Private
router.get("/:id", driverController.getDriverById);

// @route   PUT /api/driver/vehicle/:id
// @desc    Update vehicle information
// @access  Private
router.put("/vehicle/:id", driverController.updateVehicleInfo);

// @route   GET /api/driver/available
// @desc    Get all available drivers
// @access  Public
router.get("/get/available", driverController.getAvailableDrivers);

// @route   PUT /api/driver/status/:id
// @desc    Update driver's vehicle status
// @access  Private
router.put("/status/:id", driverController.updateDriverStatus);

module.exports = router;
