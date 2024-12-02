const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const  User  = require('../models/user');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, name, phone_number, role = 'user' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { username },
        { phone_number }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email, username or phone number already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
      name,
      phone_number,
      role
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      data: userResponse,
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/login  
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username },
        { email: username }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      data: userResponse,
      message: 'Logged in successfully'
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false, 
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send reset password email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    
    // Hash temporary password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Here you would normally send an email with the temporary password
    // For demo purposes, we'll just return it in the response
    return res.status(200).json({
      success: true,
      message: 'Temporary password generated',
      tempPassword // In production, send this via email instead
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/auth/update-profile
// @desc    Update user profile
// @access  Private
router.put('/update-profile', async (req, res) => {
  try {
    const { userId, name, phone_number, email } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    // Update user profile
    user.name = name || user.name;
    user.phone_number = phone_number || user.phone_number;
    user.email = email || user.email;

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      data: userResponse,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/driver/all
// @desc    Get all drivers with their vehicles
// @access  Private (Admin only)
router.get("/all", async (req, res) => {
  try {
    // Lấy role từ query param
    const { role } = req.query;

    // Danh sách role hợp lệ
    const validRoles = ["admin", "user", "driver"];

    // Kiểm tra role có hợp lệ không
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Valid roles are: admin, user, driver",
      });
    }

    // Tạo filter theo role (nếu có)
    const filter = role ? { role } : {};

    // Tìm kiếm users theo filter
    const users = await User.find(filter)
      .select("-password")
      .populate("vehicle_info");

    return res.status(200).json({
      success: true,
      data: users,
      message: `Users with role ${role || "all"} fetched successfully`,
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;