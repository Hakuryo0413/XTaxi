const express = require ("express")
const router = express.Router();
const locationController = require("../controllers/locController")

// @route PUT /api/location/:user_id
// @desc upload user's location
// @access internal
router.put("/location/:user_id", locationController.UpdateUserLocation);

// @route GET /api/location/:user_id
// @desc get cur location of specific user
// @access internal
router.get("/location/:user_id", locationController.GetLocation);

//** */