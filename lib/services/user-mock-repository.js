import UserRepository from './user-repository';
import User from "../models/user";

let instance = null;

class UserMockRepository extends UserRepository {
  static get instance() {
    return instance;
  }

  static set instance(_instance) {
    instance = _instance;
  }

  constructor() {
      super();
      if (UserMockRepository.instance === null) {
        UserMockRepository.instance = this;
        this._store = [];
        this.populateUsers();
      }
      return UserMockRepository.instance;
  }

  getInstance() {
    return new UserMockRepository();
  }

  populateUsers() {
    this._store = [
      new User({email: 'pcjpcj2@gmail.com', userName: 'pcjpcj2'}),
      new User({email: 'prettyandsimple@example.com', userName: 'prettyandsimple'}),
      new User({email: 'very.common@example.com', userName: 'very.common'}),
      new User({email: 'john.smith@example.com', userName: 'john.smith'}),
    ];
  }

  findByUserName(userName) {
    let user = this._store.find((user) => {
      return user.userName === userName;
    });
    return user;
  }
}

module.exports = UserMockRepository;