import UserRepository from './user-repository';
import User from '../models/user';

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

  findByUserName(userName) {
    let user = this._store.find((user) => {
      return user.userName === userName;
    });

    return user;
  }

  populateUsers() {
    this._store = [
      new User({email: 'pcjpcj2@gmail.com', userName: 'pcjpcj2'}),
      new User({email: 'prettyandsimple@example.com', userName: 'prettyandsimple'}),
      new User({email: 'very.common@example.com', userName: 'very.common'}),
      new User({email: 'john.smith@example.com', userName: 'john.smith'})
    ];
  }

  addUserToStore(newUser) {
    const that = this;

    return new Promise(function (resolve, reject) {
      let existsUser = that._store.find((user) => {
        return user.userName === newUser.userName;
      });

      if(!existsUser) {
        that._store.push(newUser);
        resolve(newUser);
      } else {
        reject({error: 'find duplicated userName'});
      }
    });
  }

  getUsers() {
    return this._store;
  }
}

module.exports = UserMockRepository;