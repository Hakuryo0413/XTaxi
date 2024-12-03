const express = require("express");
const router = express.Router();

const rideController = require("../controllers/rideController.js");


//@route POST api/ride/
//@desc post ride data
//@access 
router.post("/", rideController.createRide)

//@route PUT api/ride/
//@desc update ride data
//@access 
router.put("/", rideController.updateRide)

/**
 * @description Fetch all requested rides
 * @route GET /api/ride/
 */
router.get("/requested", rideController.getRequestedRides);
router.get("/income", rideController.getIncome);

module.exports = router;