class User {
  constructor(userInfo) {
    if(!userInfo.email || !userInfo.userName) {
      throw 'Need User Info {email, userName}';
    }
    this._email = userInfo.email;
    this._userName = userInfo.userName;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get userName() {
    return this._userName;
  }

  set userName(userName) {
    this._userName = userName;
  }
}

module.exports = User;