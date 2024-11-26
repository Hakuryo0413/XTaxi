const User = require('../models/user'); // Đảm bảo đường dẫn đúng

// @desc Update location of user
// @access internal
exports.UpdateUserLocation = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { coordinates } = req.body;

    // Validate input
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates. Provide an array [longitude, latitude].",
      });
    }

    // Find and update user's location
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.location.coordinates = coordinates;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User location updated successfully.",
      data: {
        user_id: user._id,
        location: user.location,
      },
    });
  } catch (error) {
    console.error('Error updating location:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// @desc Get Location of user
// @access internal
exports.GetLocation = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find user by ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User location fetched successfully.",
      data: {
        user_id: user._id,
        location: user.location,
      },
    });
  } catch (error) {
    console.error('Error fetching location:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


// @desc Find Driver
// @access internal
exports.FindDriver = async(req, res =>{

})