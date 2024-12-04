const Ride = require("../models/ride");
const logger = require("../utils/logger");

// @desc Create a new ride
// @route POST /api/ride/
exports.createRide = async (req, res) => {
  try {
    let { user_id, pickup_location, dropoff_location, distance, start_time } =
      req.body;

    // Validate required fields
    if (!user_id || !pickup_location || !dropoff_location || !distance) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (user_id, pickup_location, dropoff_location, distance) are required.",
      });
    }

    // Set default start_time if not provided
    if (!start_time) {
      start_time = new Date();
    }

    // Calculate fare using the service
    const fare = calculateFare(distance);

    // Create ride
    const newRide = new Ride({
      user_id,
      pickup_location,
      dropoff_location,
      distance,
      start_time,
      fare,
    });

    const savedRide = await newRide.save();

    return res.status(201).json({
      success: true,
      message: "Ride created successfully.",
      ride_id: savedRide._id,
    });
  } catch (error) {
    logger.error("Error creating ride:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Helper function to create a ride history entry
const createRideHistory = async (ride, status, endTime, fare) => {
  const rideHistoryData = {
    user_id: ride.user_id,
    ride_id: ride._id,
    driver_id: ride.driver_id,
    status: status,
    start_time: ride.start_time || null,
    end_time: endTime,
    fare: status === "completed" ? fare || ride.fare : 0,
    user_rating: status === "completed" ? ride.user_rating : null,
    driver_feedback: status === "completed" ? ride.driver_feedback : null,
  };

  const rideHistory = new RideHistory(rideHistoryData);
  await rideHistory.save();
};

// Helper function to update ride status
const updateRideStatus = async (ride, status, fare) => {
  const currentTime = new Date();
  ride.status = status;
  ride.end_time = currentTime;
  await ride.save();

  await createRideHistory(ride, status, currentTime, fare);
};

/**
 * Calculate fare based on distance
 * @param {number} distance - Distance of the ride in kilometers
 * @returns {number} - Calculated fare
 */
const calculateFare = (distance) => {
  const baseFare = 50; // Base fare
  const perKmRate = 10; // Cost per kilometer
  return baseFare + perKmRate * distance;
};

// @desc Update ride data
// @route PUT /api/ride/
exports.updateRide = async (req, res) => {
  try {
    const { ride_id, driver_id, status, user_rating, driver_feedback, fare } =
      req.body;

    // Validate ride_id
    if (!ride_id) {
      return res.status(400).json({
        success: false,
        message: "ride_id is required.",
      });
    }

    // Find the ride by ID
    const ride = await Ride.findById(ride_id);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found.",
      });
    }

    // Update ride based on status
    if (status === "accepted" && driver_id) {
      ride.driver_id = driver_id;
      ride.status = "accepted";
    } else if (status === "in_progress") {
      ride.status = "in_progress";
    } else if (status === "completed" || status === "canceled") {
      await updateRideStatus(ride, status, fare);
    }

    // Update user rating or driver feedback
    if (user_rating !== undefined) {
      if (user_rating < 0 || user_rating > 5) {
        return res.status(400).json({
          success: false,
          message: "user_rating must be between 0 and 5.",
        });
      }
      ride.user_rating = user_rating;
    }

    if (driver_feedback !== undefined) {
      ride.driver_feedback = driver_feedback;
    }

    // Save the updated ride if not already saved
    await ride.save();

    return res.status(200).json({
      success: true,
      message: "Ride updated successfully.",
    });
  } catch (error) {
    logger.error("Error updating ride:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/**
 * @description API get requested ride
 * @path GET /api/ride/
 */
exports.getRequestedRides = async (req, res) => {
  try {
    // Query rides with status "requested"
    const rides = await Ride.find({ status: "requested" }).populate(
      "user_id driver_id"
    );

    // If no rides found
    if (!rides || rides.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No requested rides found.",
      });
    }

    // Return the rides
    return res.status(200).json({
      success: true,
      rides,
    });
  } catch (error) {
    logger.error("Error fetching requested rides:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/**
 * @description API get ride by ID
 * @path GET /api/ride/:ride_id
 */
exports.getRideById = async (req, res) => {
  try {
    const { ride_id } = req.params;

    // Query the ride by ID
    const ride = await Ride.findById(ride_id).populate("user_id driver_id");

    // If no ride found
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found.",
      });
    }

    // Return the ride
    return res.status(200).json({
      success: true,
      ride,
    });
  } catch (error) {
    logger.error("Error fetching ride by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// /**
//  *
//  * @description update response of driver
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// exports.driverResponse = async (req, res) => {
//   try {
//     const { driver_id, ride_id, response } = req.body;

//     // Validate input
//     if (!driver_id || !ride_id || !["accept", "reject"].includes(response)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid input.",
//       });
//     }

//     // Find the ride
//     const ride = await Ride.findById(ride_id);
//     if (!ride) {
//       return res.status(404).json({
//         success: false,
//         message: "Ride not found.",
//       });
//     }

//     if (response === "accept") {
//       // Update ride with driver_id and status
//       ride.driver_id = driver_id;
//       ride.status = "inprogress";
//       await ride.save();

//       // Notify user about driver acceptance
//       notiService.notifyUser(ride.user_id, driver_id);

//       return res.status(200).json({
//         success: true,
//         message: "Ride accepted.",
//       });
//     } else if (response === "reject") {
//       // Process for reject driver

//       //NOT await, find driver work as back-ground process
//       rideService.findDriver(ride_id, ride.pickup_location)

//       return res.status(200).json({
//         success: true,
//         message: "Ride rejected.",
//       });
//     }
//   } catch (error) {
//     logger.error("Error responding to ride:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// };