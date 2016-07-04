/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _user = __webpack_require__(1);

  var _user2 = _interopRequireDefault(_user);

  var _userNameGenerator = __webpack_require__(2);

  var _userNameGenerator2 = _interopRequireDefault(_userNameGenerator);

  var _userMockRepository = __webpack_require__(6);

  var _userMockRepository2 = _interopRequireDefault(_userMockRepository);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var userGenerator = new _userNameGenerator2.default();
  var userRepository = new _userMockRepository2.default();
  var sortByUserName = true;
  var userStore = [];

  document.addEventListener('DOMContentLoaded', function () {
    loadUsers();
  });

  document.getElementById('user-validator-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var emailInput = document.getElementById('new-email');
    var userInput = document.getElementById('new-name');
    var userEmail = emailInput.value;
    var userName = userGenerator.generate(userEmail, userRepository);
    userInput.value = userName;
  });

  document.getElementById('add-user-button').addEventListener('click', function () {
    var emailInputValue = document.getElementById('new-email').value;
    var userInputValue = document.getElementById('new-name').value;
    var newUser = new _user2.default({ email: emailInputValue, userName: userInputValue });

    userRepository.addUserToStore(newUser);

    loadUsers();
  });

  document.getElementById('automate-test').addEventListener('click', function () {
    document.getElementById('automate-test').disabled = true;
    document.getElementById('automate-test').className = 'ui secondary loading button';

    for (var i = 0; i < 2000; i++) {
      var email = faker.internet.email();
      var userName = userGenerator.generate(email, userRepository);
      var newUser = new _user2.default({ email: email, userName: userName });
      userRepository.addUserToStore(newUser);
    }

    loadUsers();

    document.getElementById('automate-test').className = 'ui secondary button';
    document.getElementById('automate-test').disabled = false;
  });

  function loadUsers() {
    userStore = userRepository.getUsers();
    var sortedUserStore = [];

    if (sortByUserName) {
      sortedUserStore = userStore.sort(function (user1, user2) {
        return user1.userName > user2.userName;
      });
    }

    var html = '<h1 class="ui dividing header">Total User List - ' + sortedUserStore.length + '</h1>';
    html += '<table class="ui celled table"><thead><tr><th>Email</th><th>UserName</th></tr></thead><tbody>';

    sortedUserStore.forEach(function (user) {
      var userDOM = '<tr><td>' + user.email + '</td> <td>' + user.userName + '</td></tr>';
      html += userDOM;
    });

    html += '</tbody></table>';
    document.getElementById('user-list').innerHTML = html;
  }

/***/ },
/* 1 */
/***/ function(module, exports) {

  'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var User = function () {
    function User(userInfo) {
      _classCallCheck(this, User);

      if (!userInfo.email || !userInfo.userName) {
        throw new Error('Need User Info {email, userName}');
      }

      this._email = userInfo.email;
      this._userName = userInfo.userName;
    }

    _createClass(User, [{
      key: 'email',
      get: function get() {
        return this._email;
      },
      set: function set(email) {
        this._email = email;
      }
    }, {
      key: 'userName',
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _emailValidator = __webpack_require__(3);

  var _emailValidator2 = _interopRequireDefault(_emailValidator);

  var _userRepository = __webpack_require__(4);

  var _userRepository2 = _interopRequireDefault(_userRepository);

  var _generator = __webpack_require__(5);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var UserNameGenerator = function () {
    function UserNameGenerator() {
      _classCallCheck(this, UserNameGenerator);
    }

    _createClass(UserNameGenerator, [{
      key: 'generate',
      value: function generate(email, repository) {
        this.validateParameters(email, repository);

        var newUserName = _emailValidator2.default.splitParts(email).local;

        while (this.checkDuplicateUserName(newUserName, repository)) {
          newUserName += this.getRandomPrefixer();
        }

        return newUserName;
      }
    }, {
      key: 'checkDuplicateUserName',
      value: function checkDuplicateUserName(userName, repository) {
        if (userName.length > _generator.MAX_USER_NAME_LENGTH - _generator.PREFIX_LENGTH) {
          throw new Error('User name is too long maximum : ' + _generator.MAX_USER_NAME_LENGTH);
        }

        var duplicateUser = repository.findByUserName(userName);
        return !!duplicateUser;
      }
    }, {
      key: 'validateParameters',
      value: function validateParameters(email, repository) {
        var isValidEmail = _emailValidator2.default.validate(email);
        var isValidRepository = repository instanceof _userRepository2.default;

        if (isValidEmail && isValidRepository) {
          return true;
        }

        var errorMessages = '';
        errorMessages += !isValidEmail ? '#validateParameters : Email is invalid.\n' : '';
        errorMessages += !isValidRepository ? '#validateParameters : given repository is not User Repository.\n' : '';

        throw new Error(errorMessages);
      }
    }, {
      key: 'getRandomPrefixer',
      value: function getRandomPrefixer() {
        // same localpart + Maximum 238_328 cases random characters
        var appendableText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var numberOfAppendables = 62; // appendableText.length
        var randomPrefix = '';
        for (var i = 0; i < _generator.PREFIX_LENGTH; i++) {
          randomPrefix += appendableText.charAt(Math.floor(Math.random() * numberOfAppendables));
        }

        return randomPrefix;
      }
    }]);

    return UserNameGenerator;
  }();

  module.exports = UserNameGenerator;

/***/ },
/* 3 */
/***/ function(module, exports) {

  'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var EmailValidator = function () {
    function EmailValidator() {
      _classCallCheck(this, EmailValidator);
    }

    _createClass(EmailValidator, null, [{
      key: 'validate',
      value: function validate(email) {
        if (!email) {
          return false;
        }

        if (email.length > 320) {
          // local(64) + @ + domain(255)
          return false;
        }

        var emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/;
        if (!emailRegex.test(email)) {
          return false;
        }

        var parts = this.splitParts(email);
        if (parts.local.length > 64 || parts.domain.length > 255) {
          return false;
        }

        return true;
      }
    }, {
      key: 'splitParts',
      value: function splitParts(email) {
        var splitedEmail = email.split('@');
        return { local: splitedEmail[0], domain: splitedEmail[1] };
      }
    }]);

    return EmailValidator;
  }();

  module.exports = EmailValidator;

/***/ },
/* 4 */
/***/ function(module, exports) {

  'use strict';

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var UserRepository = function UserRepository() {
    _classCallCheck(this, UserRepository);

    if (this.constructor === UserRepository) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }

    if (this.findByUserName === undefined) {
      throw new TypeError('Please implement Abstract method findByUserName');
    }
  };

  module.exports = UserRepository;

/***/ },
/* 5 */
/***/ function(module, exports) {

  "use strict";

  module.exports = {
    MAX_USER_NAME_LENGTH: 100,
    PREFIX_LENGTH: 3
  };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _userRepository = __webpack_require__(4);

  var _userRepository2 = _interopRequireDefault(_userRepository);

  var _user = __webpack_require__(1);

  var _user2 = _interopRequireDefault(_user);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var instance = null;

  var UserMockRepository = function (_UserRepository) {
    _inherits(UserMockRepository, _UserRepository);

    _createClass(UserMockRepository, null, [{
      key: 'instance',
      get: function get() {
        return instance;
      },
      set: function set(_instance) {
        instance = _instance;
      }
    }]);

    function UserMockRepository() {
      var _ret;

      _classCallCheck(this, UserMockRepository);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserMockRepository).call(this));

      if (UserMockRepository.instance === null) {
        UserMockRepository.instance = _this;
        _this._store = [];
        _this.populateUsers();
      }

      return _ret = UserMockRepository.instance, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UserMockRepository, [{
      key: 'getInstance',
      value: function getInstance() {
        return new UserMockRepository();
      }
    }, {
      key: 'findByUserName',
      value: function findByUserName(userName) {
        var user = this._store.find(function (user) {
          return user.userName === userName;
        });

        return user;
      }
    }, {
      key: 'populateUsers',
      value: function populateUsers() {
        this._store = [new _user2.default({ email: 'pcjpcj2@gmail.com', userName: 'pcjpcj2' }), new _user2.default({ email: 'prettyandsimple@example.com', userName: 'prettyandsimple' }), new _user2.default({ email: 'very.common@example.com', userName: 'very.common' }), new _user2.default({ email: 'john.smith@example.com', userName: 'john.smith' })];
      }
    }, {
      key: 'addUserToStore',
      value: function addUserToStore(newUser) {
        var that = this;

        return new Promise(function (resolve, reject) {
          var existsUser = that._store.find(function (user) {
            return user.userName === newUser.userName;
          });

          if (!existsUser) {
            that._store.push(newUser);
            resolve(newUser);
          } else {
            reject({ error: 'find duplicated userName' });
          }
        });
      }
    }, {
      key: 'getUsers',
      value: function getUsers() {
        return this._store;
      }
    }]);

    return UserMockRepository;
  }(_userRepository2.default);

  module.exports = UserMockRepository;

/***/ }
/******/ ]);
