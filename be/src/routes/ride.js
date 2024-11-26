const express = require("express");
const router = express.Router();

const rideController = require("../controllers/rideController");


//@route POST api/ride/
//@desc post ride data
//@access 
router.post("/", rideController.createRide)

//@route PUT api/ride/
//@desc update ride data
//@access 
router.put("/", rideController.updateRide)

/**
 * @description API update driver response when receive a ride
 */

router.put("/driver-response", rideController.driverResponse)

/**
 * @description API long polling - get ride notifications
 */
router.get("/ride-notifications/:user_id", rideController.Notification)