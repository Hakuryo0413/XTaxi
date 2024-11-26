const express = require('express');
const router = express.Router();
const rideHistoryController = require('../controllers/statisticController'); // Đảm bảo đúng đường dẫn

// @route   GET /api/history/driver/:driverId
// @desc    Get driver's ride history with filters
router.get('/driver/:driverId', rideHistoryController.getDriverRideHistory);

// @route   GET /api/history/income/:driverId
// @desc    Get driver's income statistics
router.get('/income/:driverId', rideHistoryController.getDriverIncomeStatistics);

// @route   GET /api/history/ratings/:driverId
// @desc    Get driver's detailed ratings and reviews
router.get('/ratings/:driverId', rideHistoryController.getDriverRatings);

// @route   GET /api/history/ride/:rideId
// @desc    Get detailed information about a specific ride
router.get('/ride/:rideId', rideHistoryController.getRideDetails);

module.exports = router;