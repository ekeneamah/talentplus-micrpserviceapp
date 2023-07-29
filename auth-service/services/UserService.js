const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../helpers/logger');

class UserRegistrationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'USER_REGISTRATION_ERROR';
  }
}

class UserLoginError extends Error {
  constructor(message) {
    super(message);
    this.code = 'USER_LOGIN_ERROR';
  }
}

class UserService {
  async createUser(userData) {
    try {
      // ... (unchanged)
    } catch (error) {
      logger.error('Error while creating user', { error });
      throw new UserRegistrationError('Could not create user');
    }
  }

  async findUserByUsername(username) {
    try {
      // ... (unchanged)
    } catch (error) {
      logger.error('Error while finding user by username', { error });
      throw new UserLoginError('Could not find user');
    }
  }
}

module.exports = { UserService, UserRegistrationError, UserLoginError };
