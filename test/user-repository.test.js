import Mocha from 'mocha';
import { assert } from 'chai';
const { suite, test} = Mocha;

import UserRepository from '../lib/services/user-repository';

suite('UserRepository', function() {
  suite('#constructor', function(){
    test('should not instantiate abstract UserRepository', function(){
      assert.throw(function(){
        new UserRepository();
      });
    });

    test('should have abstract method findByUserName', function(){
      class MockRepositoryWithoutFindByUserName extends UserRepository{
        constructor() {
          super();
        }
      }
      class MockRepositoryWithFindByUserName extends UserRepository{
        constructor() {
          super();
        }

        findByUserName() {

        }
      }

      assert.throw(function(){
        new MockRepositoryWithoutFindByUserName();
      });
      assert.doesNotThrow(function(){
        new MockRepositoryWithFindByUserName();
      });

    });
  });
});