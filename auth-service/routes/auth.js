const express = require('express');
const AuthService = require('../services/authService');
const logger = require('../helpers/logger');
const { UserRegistrationError, UserLoginError, UserAuthenticationError } = require('../services/UserService');

const router = express.Router();
//const authService = new AuthService();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const userData = new IUser(req.body.username, req.body.password);
    const user = await authService.registerUser(userData);
    logger.info('User registered successfully', { username: user.username });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof UserRegistrationError) {
      return res.status(409).json({ message: error.message, code: error.code });
    }
    logger.error('Error while registering user', { error });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);
    logger.info('User logged in successfully', { username });
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof UserLoginError || error instanceof UserAuthenticationError) {
      return res.status(401).json({ message: error.message, code: error.code });
    }
    logger.error('Error while logging in', { error });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route
router.get('/protected', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Authorization header missing', code: 'AUTHORIZATION_HEADER_MISSING' });
  }

  try {
    const response = await authService.accessProtectedRoute(authorization);
    logger.info('User accessed protected route', { userId: response.userId });
    return res.status(200).json({ message: 'You have access to this protected route' });
  } catch (error) {
    if (error instanceof UserAuthenticationError) {
      return res.status(401).json({ message: error.message, code: error.code });
    }
    logger.error('Error while accessing protected route', { error });
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
