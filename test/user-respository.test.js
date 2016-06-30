import Mocha from 'mocha';
import { assert } from 'chai';
import 'babel-polyfill';
const { suite, suiteSetup, suiteTeardown, setup, teardown, test} = Mocha;
import UserMockRepository from '../lib/services/user-mock-repository';
import User from '../lib/models/user';

suite('UserRepository', function() {
  suite('#constructor()', function(){
    test('should user repository create only one instance', function(){
      let repository1 = new UserMockRepository();
      let repository2 = new UserMockRepository();
      assert.equal(repository1, repository2, 'repository must create only one instance');
    });
  });

  suite('#findByUserName', function(){
    let user = undefined;
    let repository = undefined;

    setup(function(){
      repository = new UserMockRepository();
    });

    teardown(function(){
      repository = undefined;
      user = undefined;
    });

    test('should return undefined when userName not exists', function() {
      user = repository.findByUserName('johndoe');
      assert.isUndefined(user, 'user is undefined');
    });

    test('should return User type object when userName exists', function(){
      user = repository.findByUserName('pcjpcj2');
      assert.typeOf(user, 'object');
      assert.equal(user.constructor.name, 'User');
    });


    test('should return user object when userName exists', function() {
      user = repository.findByUserName('pcjpcj2');
      assert.isDefined(user, 'userName is pcjpcj2');
      assert.isNotNull(user);
      assert.equal(user.userName, 'pcjpcj2');

      user = repository.findByUserName('prettyandsimple');
      assert.isDefined(user, 'userName is prettyandsimple');
      assert.isNotNull(user);
      assert.equal(user.userName, 'prettyandsimple');
    });
  });
});