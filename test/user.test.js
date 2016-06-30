import Mocha from 'mocha';
import { assert } from 'chai';
import 'babel-polyfill'
import User from '../lib/models/user';
const { suite, suiteSetup, suiteTeardown, setup, teardown, test} = Mocha;


suite('User', function(){
  suite('#constructor()', function() {
    test('should throw when user Info not exists', function(){
      assert.throws(function(){
        new User({});
      }, 'Need User Info {email, userName');
    });

    test('should throw when userName not exists', function(){
      assert.throws(function(){
        new User({email: 'pcjpcj2@gmail.com'});
      }, 'Need User Info {email, userName');
    });

    test('should throw when email not exists', function(){
      assert.throws(function(){
        new User({userName: 'ChangJoo Park'});
      }, 'Need User Info {email, userName');
    });

    test('should not throw when email, userName exists', function() {
      assert.doesNotThrow(function(){
        new User({email: 'pcjpcj2@gmail.com', userName: 'ChangJoo Park'});
      },'User constructor does not throw');
    });
  });

  suite('#get set email()', function(){
    test('should return pcjpcj2@gmail.com', function(){
      let user = new User({email: 'pcjpcj2@gmail.com', userName: 'ChangJoo Park'});
      assert.equal(user.email,'pcjpcj2@gmail.com');
    });

    test('should return abcd@gmail.com', function(){
      let user = new User({email: 'pcjpcj2@gmail.com', userName: 'ChangJoo Park'});
      user.email = 'abcd2@gmail.com';
      assert.equal(user.email,'abcd2@gmail.com');
    });
  });

  suite('#get set userName()', function(){
    test('should return ChangJoo Park', function(){
      let user = new User({email: 'pcjpcj2@gmail.com', userName: 'ChangJoo Park'});
      assert.equal(user.userName, 'ChangJoo Park');
    });

    test('should return John Doe', function(){
      let user = new User({email: 'pcjpcj2@gmail.com', userName: 'ChangJoo Park'});
      user.userName = 'John Doe';
      assert.equal(user.userName,'John Doe');
    });
  });
});
