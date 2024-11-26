const Ride = require("../models/ride");
const rideService = require("../services/rideService")
const notiService = require("../services/notiService")
const Notification = require("../models/notification");
const logger = require("../logger/logger")

// @desc Create a new ride
// @route POST /api/ride/
exports.createRide = async (req, res) => {
  try {
    const { user_id, pickup_location, dropoff_location, distance, start_time } = req.body;

    // Validate required fields
    if (!user_id || !pickup_location || !dropoff_location || !distance) {
      return res.status(400).json({
        success: false,
        message: "All fields (user_id, pickup_location, dropoff_location, distance) are required.",
      });
    }
    if (!start_time){
      start_time = new Date()
    }

    // Calculate fare using the service
    const fare = rideService.calculateFare(distance);
    // Create ride
    const newRide = new Ride({
      user_id,
      pickup_location,
      dropoff_location,
      distance,
      start_time,
      fare,
    });

    await newRide.save();

    //NOT AWAIT: findDriver work as back-ground process
    rideService.findDriver(newRide._id, pickup_location);

    return res.status(201).json({
      success: true,
      message: "Ride created successfully.",
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

// @desc Update ride data
// @route PUT /api/ride/
exports.updateRide = async (req, res) => {
  try {
    const { ride_id, driver_id, status, user_rating, driver_feedback, fare } = req.body;

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
 * 
 * @description update response of driver
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.driverResponse = async (req, res) => {
  try {
    const { driver_id, ride_id, response } = req.body;

    // Validate input
    if (!driver_id || !ride_id || !["accept", "reject"].includes(response)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input.",
      });
    }

    // Find the ride
    const ride = await Ride.findById(ride_id);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found.",
      });
    }

    if (response === "accept") {
      // Update ride with driver_id and status
      ride.driver_id = driver_id;
      ride.status = "inprogress";
      await ride.save();

      // Notify user about driver acceptance
      notiService.notifyUser(ride.user_id, driver_id);

      return res.status(200).json({
        success: true,
        message: "Ride accepted.",
      });
    } else if (response === "reject") {
      // Process for reject driver 

      //NOT await, find driver work as back-ground process
      rideService.findDriver(ride_id, ride.pickup_location)

      return res.status(200).json({
        success: true,
        message: "Ride rejected.",
      });
    }
  } catch (error) {
    logger.error("Error responding to ride:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


exports.Notification = async(req,  async (req, res) => {
  const { user_id } = req.params;
  const timeout = 1000 * 600; // 10p
  const startTime = Date.now();

  try {
    const fetchNotifications = async () => {
      const notifications = await Notification.find({ user_id, status: "unread" });

      if (notifications.length > 0) {
        return res.status(200).json({ success: true, notifications });
      }

      if (Date.now() - startTime >= timeout) {
        return res.status(204).send();
      }

      setTimeout(fetchNotifications, 1000); //1s
    };

    await fetchNotifications();
  } catch (error) {
    logger.error(`Error fetching notifications for user ${user_id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})