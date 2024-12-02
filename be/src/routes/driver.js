const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Vehicle = require("../models/vehicle");

// @route   POST /api/driver/register
// @desc    Register new driver with vehicle
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const {
      // Driver info
      username,
      password,
      name,
      phone_number,
      email,
      // Vehicle info
      license_plate,
      vehicle_type,
      capacity,
    } = req.body;

    // Check if driver already exists
    const existingDriver = await User.findOne({
      $or: [{ email }, { username }, { phone_number }],
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message:
          "Driver with this email, username or phone number already exists",
      });
    }

    // Check if vehicle already exists
    const existingVehicle = await Vehicle.findOne({ license_plate });
    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle with this license plate already exists",
      });
    }

    // Create new driver
    const driver = new User({
      username,
      password, // Assuming password is already hashed in auth middleware
      name,
      phone_number,
      email,
      role: "driver",
      rating: 0,
      income: 0,
    });

    await driver.save();

    // Create new vehicle
    const vehicle = new Vehicle({
      driver_id: driver._id,
      license_plate,
      vehicle_type,
      capacity,
      registered_date: new Date(),
      status: "active",
    });

    await vehicle.save();

    // Update driver with vehicle info
    driver.vehicle_info = vehicle._id;
    await driver.save();

    // Prepare response (excluding sensitive info)
    const driverResponse = driver.toObject();
    delete driverResponse.password;

    return res.status(201).json({
      success: true,
      data: {
        driver: driverResponse,
        vehicle: vehicle,
      },
      message: "Driver and vehicle registered successfully",
    });
  } catch (error) {
    console.error("Driver registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route   GET /api/driver/all
// @desc    Get all drivers with their vehicles
// @access  Private (Admin only)
router.get("/all", async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" })
      .select("-password")
      .populate("vehicle_info");

    return res.status(200).json({
      success: true,
      data: drivers,
      message: "Drivers fetched successfully",
    });
  } catch (error) {
    console.error("Fetch drivers error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route   GET /api/driver/:id
// @desc    Get specific driver with vehicle info
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const driver = await User.findOne({ _id: req.params.id, role: "driver" })
      .select("-password")
      .populate("vehicle_info");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: driver,
      message: "Driver fetched successfully",
    });
  } catch (error) {
    console.error("Fetch driver error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route   PUT /api/driver/vehicle/:id
// @desc    Update vehicle information
// @access  Private
router.put("/vehicle/:id", async (req, res) => {
  try {
    const { vehicle_type, capacity, status } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Update vehicle info
    vehicle.vehicle_type = vehicle_type || vehicle.vehicle_type;
    vehicle.capacity = capacity || vehicle.capacity;
    vehicle.status = status || vehicle.status;

    await vehicle.save();

    return res.status(200).json({
      success: true,
      data: vehicle,
      message: "Vehicle updated successfully",
    });
  } catch (error) {
    console.error("Update vehicle error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route   GET /api/driver/available
// @desc    Get all available drivers
// @access  Public
router.get("/get/available", async (req, res) => {
  try {
    const availableDrivers = await User.find({
      role: "driver",
      vehicle_info: { $exists: true },
    })
      .select("-password")
      .populate({
        path: "vehicle_info",
        match: { status: "active" },
      })
      .exec();

    // Filter out drivers whose vehicles are not active
    const activeDrivers = availableDrivers.filter(
      (driver) => driver.vehicle_info
    );

    return res.status(200).json({
      success: true,
      data: activeDrivers,
      message: "Available drivers fetched successfully",
    });
  } catch (error) {
    console.error("Fetch available drivers error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route   PUT /api/driver/status/:id
// @desc    Update driver's vehicle status
// @access  Private
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const vehicle = await Vehicle.findOne({ driver_id: req.params.id });
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.status = status;
    await vehicle.save();

    return res.status(200).json({
      success: true,
      data: vehicle,
      message: "Vehicle status updated successfully",
    });
  } catch (error) {
    console.error("Update status error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/get/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().exec();

    return res.status(200).json({
      success: true,
      data: vehicles,
      message: "All vehicles fetched successfully",
    });
  } catch (error) {
    console.error("Fetch vehicles error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
