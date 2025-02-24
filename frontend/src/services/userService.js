const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

// Get a single user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

// Update a user by ID
const updateUser = async (userId, username, email) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
