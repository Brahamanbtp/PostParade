const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', userController.register);

// Login a user
router.post('/login', authController.login);

// Verify user email
router.get('/verify-email/:userId/:token', userController.verifyEmail);

// Protect the following routes
router.use(authController.protect);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Change user password
router.post('/change-password', userController.changePassword);

// Refresh token (optional, if implementing token refresh)
router.post('/refresh-token', authController.refreshToken);

// Logout a user (optional, if implementing token blacklisting)
router.post('/logout', authController.logout);

module.exports = router;
