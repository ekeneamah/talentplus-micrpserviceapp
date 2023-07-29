// microservice/controllers/UserController.js
const UserService = require('../services/UserService');
const NotFoundException = require('../errors/NotFoundException');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUserById(userId) {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
