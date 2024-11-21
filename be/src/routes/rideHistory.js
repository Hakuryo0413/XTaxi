const express = require('express');
const router = express.Router();
const RideHistory = require('../models/rideHistory');
const mongoose = require('mongoose');

// @route   GET /api/history/driver/:driverId
// @desc    Get driver's ride history with filters
// @access  Private
router.get('/driver/:driverId', async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      status,
      limit = 10,
      page = 1
    } = req.query;

    // Build query
    const query = {
      driver_id: req.params.driverId
    };

    // Add date filter if provided
    if (startDate || endDate) {
      query.start_time = {};
      if (startDate) query.start_time.$gte = new Date(startDate);
      if (endDate) query.start_time.$lte = new Date(endDate);
    }

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get rides with pagination
    const rides = await RideHistory.find(query)
      .sort({ start_time: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user_id', 'name phone_number')
      .populate('ride_id');

    // Get total count for pagination
    const total = await RideHistory.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: {
        rides,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total
        }
      },
      message: 'Ride history fetched successfully'
    });

  } catch (error) {
    console.error('Fetch ride history error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/history/income/:driverId
// @desc    Get driver's income statistics
// @access  Private
router.get('/income/:driverId', async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    // Build date range
    const dateQuery = {};
    if (startDate) dateQuery.$gte = new Date(startDate);
    if (endDate) dateQuery.$lte = new Date(endDate);

    // Build group stage based on groupBy parameter
    let groupStage = {};
    switch(groupBy) {
      case 'day':
        groupStage = {
          year: { $year: '$start_time' },
          month: { $month: '$start_time' },
          day: { $dayOfMonth: '$start_time' }
        };
        break;
      case 'month':
        groupStage = {
          year: { $year: '$start_time' },
          month: { $month: '$start_time' }
        };
        break;
      case 'year':
        groupStage = {
          year: { $year: '$start_time' }
        };
        break;
    }

    // Aggregate income data
    const incomeStats = await RideHistory.aggregate([
      {
        $match: {
          driver_id: req.params.driverId,
          status: 'completed',
          start_time: dateQuery
        }
      },
      {
        $group: {
          _id: groupStage,
          totalIncome: { $sum: '$fare' },
          totalRides: { $sum: 1 },
          averageRating: { $avg: '$user_rating' },
          completedRides: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } }
    ]);

    // Calculate summary statistics
    const summary = await RideHistory.aggregate([
      {
        $match: {
          driver_id: req.params.driverId,
          status: 'completed',
          start_time: dateQuery
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$fare' },
          totalRides: { $sum: 1 },
          averageRating: { $avg: '$user_rating' },
          topRating: { $max: '$user_rating' },
          lowRating: { $min: '$user_rating' }
        }
      }
    ]);

    // Get recent feedback
    const recentFeedback = await RideHistory.find({
      driver_id: req.params.driverId,
      driver_feedback: { $exists: true, $ne: '' },
      start_time: dateQuery
    })
    .sort({ start_time: -1 })
    .limit(5)
    .populate('user_id', 'name');

    return res.status(200).json({
      success: true,
      data: {
        incomeStats,
        summary: summary[0] || {
          totalIncome: 0,
          totalRides: 0,
          averageRating: 0,
          topRating: 0,
          lowRating: 0
        },
        recentFeedback
      },
      message: 'Income statistics fetched successfully'
    });

  } catch (error) {
    console.error('Fetch income stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/history/ratings/:driverId
// @desc    Get driver's detailed ratings and reviews
// @access  Private
router.get('/ratings/:driverId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get ratings with pagination
    const ratings = await RideHistory.find({
      driver_id: req.params.driverId,
      user_rating: { $exists: true }
    })
    .sort({ start_time: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user_id', 'name')
    .select('user_rating driver_feedback start_time user_id');

    // Get rating statistics
    const ratingStats = await RideHistory.aggregate([
      {
        $match: {
          driver_id: req.params.driverId,
          user_rating: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$user_rating',
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          ratings: {
            $push: {
              rating: '$_id',
              count: '$count'
            }
          },
          totalCount: { $sum: '$count' }
        }
      }
    ]);

    // Calculate rating distribution
    const ratingDistribution = ratingStats[0]?.ratings.map(r => ({
      rating: r.rating,
      count: r.count,
      percentage: ((r.count / ratingStats[0].totalCount) * 100).toFixed(1)
    })) || [];

    return res.status(200).json({
      success: true,
      data: {
        ratings,
        statistics: {
          distribution: ratingDistribution,
          totalRatings: ratingStats[0]?.totalCount || 0
        }
      },
      message: 'Ratings fetched successfully'
    });

  } catch (error) {
    console.error('Fetch ratings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/history/ride/:rideId
// @desc    Get detailed information about a specific ride
// @access  Private
router.get('/ride/:rideId', async (req, res) => {
  try {
    const ride = await RideHistory.findById(req.params.rideId)
      .populate('user_id', 'name phone_number')
      .populate('ride_id');

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: 'Ride not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: ride,
      message: 'Ride details fetched successfully'
    });

  } catch (error) {
    console.error('Fetch ride details error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;