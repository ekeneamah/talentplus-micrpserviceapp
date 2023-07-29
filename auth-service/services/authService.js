const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserService, UserRegistrationError, UserLoginError } = require('./UserService');
const logger = require('../helpers/logger');

class UserAuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'USER_AUTHENTICATION_ERROR';
  }
}

class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  async registerUser(userData) {
    try {
      // ... (unchanged)
    } catch (error) {
      logger.error('Error while registering user', { error });
      throw new UserRegistrationError('Could not register user');
    }
  }

  async loginUser(username, password) {
    try {
      // ... (unchanged)
    } catch (error) {
      logger.error('Error while logging in', { error });
      throw new UserAuthenticationError('Invalid credentials');
    }
  }
}

module.exports = { AuthService, UserAuthenticationError };
