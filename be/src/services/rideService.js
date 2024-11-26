const User = require("../models/user")
const notiService = require("./notiService")

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

const findDriver = async (ride_id, pickup_location) => {
  try {
    const maxRetries = 100;
    let retries = 0;

    while (retries < maxRetries) {
      retries++;

      const ride = await Ride.findById(ride_id);
      if (!ride) {
        logger.warn(`Ride ${ride_id} not found.`);
        return;
      }

      if (ride.status === "canceled") {
        logger.info(`Ride ${ride_id} was canceled by user.`);
        return;
      }

      const drivers = await User.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: pickup_location.coordinates },
            distanceField: "distance",
            maxDistance: 5000, // Search within 5 km radius
            spherical: true,
            query: {
              role: "driver",
              "location.type": "Point",
              "vehicle_info.status": "active",
            },
          },
        },
        { $limit: 1 },
      ]);

      if (drivers.length === 0) {
        logger.info("No available drivers found.");
        continue;
      }

      const driver = drivers[0];

      logger.info(`Sending notification to driver ${driver._id} for ride ${ride_id}`);
      await notiService.notifyDriver(driver._id, ride_id);
      return
    }

    logger.warn(`Max retries reached for ride ${ride_id}. No driver found.`);
  } catch (error) {
    logger.error("Error finding driver:", error);
    throw error;
  }
};
module.exports = {
  calculateFare,
  findDriver
};