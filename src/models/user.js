"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(userInfo) {
    _classCallCheck(this, User);

    if (!userInfo.email || !userInfo.userName) {
      throw "Need User Info {email, userName}";
    }
    this._email = userInfo.email;
    this._userName = userInfo.userName;
  }

  _createClass(User, [{
    key: "email",
    get: function get() {
      return this._email;
    },
    set: function set(email) {
      this._email = email;
    }
  }, {
    key: "userName",
    get: function get() {
      return this._userName;
    },
    set: function set(userName) {
      this._userName = userName;
    }
  }]);

  return User;
}();

module.exports = User;