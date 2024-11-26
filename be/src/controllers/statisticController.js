const RideHistory = require('../models/rideHistory');

// @desc    Get driver's ride history with filters
// @route   GET /api/history/driver/:driverId
const getDriverRideHistory = async (req, res) => {
  try {
    const { startDate, endDate, status, limit = 10, page = 1 } = req.query;
    const query = { driver_id: req.params.driverId };

    if (startDate || endDate) {
      query.start_time = {};
      if (startDate) query.start_time.$gte = new Date(startDate);
      if (endDate) query.start_time.$lte = new Date(endDate);
    }
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const rides = await RideHistory.find(query)
      .sort({ start_time: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user_id', 'name phone_number')
      .populate('ride_id');

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
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get driver's income statistics
// @route   GET /api/history/income/:driverId
const getDriverIncomeStatistics = async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    const dateQuery = {};
    if (startDate) dateQuery.$gte = new Date(startDate);
    if (endDate) dateQuery.$lte = new Date(endDate);

    let groupStage = {};
    switch (groupBy) {
      case 'day':
        groupStage = { year: { $year: '$start_time' }, month: { $month: '$start_time' }, day: { $dayOfMonth: '$start_time' } };
        break;
      case 'month':
        groupStage = { year: { $year: '$start_time' }, month: { $month: '$start_time' } };
        break;
      case 'year':
        groupStage = { year: { $year: '$start_time' } };
        break;
    }

    const incomeStats = await RideHistory.aggregate([
      { $match: { driver_id: req.params.driverId, status: 'completed', start_time: dateQuery } },
      { $group: { _id: groupStage, totalIncome: { $sum: '$fare' }, totalRides: { $sum: 1 }, averageRating: { $avg: '$user_rating' } } },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } }
    ]);

    const summary = await RideHistory.aggregate([
      { $match: { driver_id: req.params.driverId, status: 'completed', start_time: dateQuery } },
      { $group: { _id: null, totalIncome: { $sum: '$fare' }, totalRides: { $sum: 1 }, averageRating: { $avg: '$user_rating' } } }
    ]);

    const recentFeedback = await RideHistory.find({
      driver_id: req.params.driverId,
      driver_feedback: { $exists: true, $ne: '' },
      start_time: dateQuery
    }).sort({ start_time: -1 }).limit(5).populate('user_id', 'name');

    return res.status(200).json({
      success: true,
      data: {
        incomeStats,
        summary: summary[0] || { totalIncome: 0, totalRides: 0, averageRating: 0 },
        recentFeedback
      },
      message: 'Income statistics fetched successfully'
    });
  } catch (error) {
    console.error('Fetch income stats error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get driver's detailed ratings and reviews
// @route   GET /api/history/ratings/:driverId
const getDriverRatings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const ratings = await RideHistory.find({
      driver_id: req.params.driverId,
      user_rating: { $exists: true }
    })
      .sort({ start_time: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user_id', 'name')
      .select('user_rating driver_feedback start_time user_id');

    const ratingStats = await RideHistory.aggregate([
      { $match: { driver_id: req.params.driverId, user_rating: { $exists: true } } },
      { $group: { _id: '$user_rating', count: { $sum: 1 } } }
    ]);

    const ratingDistribution = ratingStats.map(r => ({
      rating: r._id,
      count: r.count
    }));

    return res.status(200).json({
      success: true,
      data: { ratings, statistics: { distribution: ratingDistribution } },
      message: 'Ratings fetched successfully'
    });
  } catch (error) {
    console.error('Fetch ratings error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get detailed information about a specific ride
// @route   GET /api/history/ride/:rideId
const getRideDetails = async (req, res) => {
  try {
    const ride = await RideHistory.findById(req.params.rideId)
      .populate('user_id', 'name phone_number')
      .populate('ride_id');

    if (!ride) {
      return res.status(404).json({ success: false, message: 'Ride not found' });
    }

    return res.status(200).json({ success: true, data: ride, message: 'Ride details fetched successfully' });
  } catch (error) {
    console.error('Fetch ride details error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getDriverRideHistory,
  getDriverIncomeStatistics,
  getDriverRatings,
  getRideDetails
};
