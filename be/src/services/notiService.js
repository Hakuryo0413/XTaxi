const User = require("../models/user")
const Ride = require("../models/ride")
const logger = require("../logger/logger")

const sendNotification = async (user_id, content, type = "info") => {
    try {
      // Tạo thông báo mới
      const newNotification = new Notification({
        user_id,
        type,
        noti_content: content,
      });
  
      // Lưu vào database
      await newNotification.save();
  
      // Log gửi thông báo
      logger.info(`Notification saved for user ${user_id}: ${JSON.stringify(content)}`);
    } catch (error) {
      logger.error(`Error sending notification to user ${user_id}:`, error);
    }
  };
  

// Notify Driver
const notifyDriver = async (driver_id, ride_id) => {
    try {
        // Find ride details by ride_id
        const ride = await Ride.findById(ride_id);
        if (!ride) {
            logger.warn(`Ride ${ride_id} not found.`);
            return;
        }

        // Prepare content for the driver
        const content = {
            type: "ride_request",
            ride_id: ride._id,
            pickup_location: ride.pickup_location,
            dropoff_location: ride.dropoff_location,
            distance: ride.distance,
            fare: ride.fare,
        };

        // Send notification to the driver
        await sendNotification(driver_id, content, "urgent");
    } catch (error) {
        logger.error(`Error notifying driver ${driver_id} about ride ${ride_id}:`, error);
    }
};

// Notify User
const notifyUser = async (user_id, driver_id) => {
    try {
        // Find driver details by driver_id
        const driver = await User.findById(driver_id).populate("vehicle_info");
        if (!driver) {
            logger.warn(`Driver ${driver_id} not found.`);
            return;
        }

        // Prepare content for the user
        const content = {
            type: "driver_assigned",
            driver_name: driver.name,
            driver_phone: driver.phone_number,
            driver_rating: driver.rating,
            vehicle_info: driver.vehicle_info,
        };

        // Send notification to the user
        await sendNotification(user_id, content, "urgent");
    } catch (error) {
        logger.error(`Error notifying user ${user_id} about driver ${driver_id}:`, error);
    }
};

module.exports = {
    notifyDriver,
    notifyUser,
};