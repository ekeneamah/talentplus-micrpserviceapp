const AppError = require('./AppError');

class UnauthorizedException extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = UnauthorizedException;
