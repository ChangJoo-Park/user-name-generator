class User {
  constructor(userInfo) {
    if(!userInfo.email || !userInfo.userName) {
      throw "Need User Info {email, userName}";
    }
    this._email = userInfo.email;
    this._userName = userInfo.userName;
  }
}

module.exports = User;