import UserRepository from './user-repository';

let instance = null;

class UserDatabaseRepository extends UserRepository {
  static get instance() {
    return instance;
  }

  static set instance(_instance) {
    instance = _instance;
  }

  constructor() {
    super();
    if (UserDatabaseRepository.instance === null) {
      UserDatabaseRepository.instance = this;
    }

    return UserDatabaseRepository.instance;
  }

  getInstance() {
    return new UserDatabaseRepository();
  }

  findByUserName(userName) {
    return userName;
  }
}

module.exports = UserDatabaseRepository;