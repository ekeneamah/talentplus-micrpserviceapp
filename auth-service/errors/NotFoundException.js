const AppError = require('./AppError');

class NotFoundException extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundException;
