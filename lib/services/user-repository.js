class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    if (this.findByUserName === undefined) {
      throw new TypeError("Please implement Abstract method findByUserName");
    }
  }
}

module.exports = UserRepository;