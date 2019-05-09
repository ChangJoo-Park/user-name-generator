import Mocha from 'mocha';
import { assert } from 'chai';
const { suite, setup, teardown, test} = Mocha;
import UserNameGenerator from '../lib/helpers/user-name-generator';
import UserMockRepository from '../lib/services/user-mock-repository';
import { MAX_USER_NAME_LENGTH, PREFIX_LENGTH } from '../lib/generator.config';

suite('UserNameGenerator', function() {
  let generator = undefined;
  let repository = undefined;
  setup(function(){
    generator = new UserNameGenerator();
    repository = new UserMockRepository();
  });

  teardown(function(){
    generator = undefined;
    repository = undefined;
  });
  suite('#generate', function() {
    test('should generate unique name', function() {
      let email = 'pcjpcj2@gmail.com';
      let userName = generator.generate(email, repository);
      let user = repository.findByUserName(userName);
      assert.isFalse(!!user);
    });
  });

  suite('#checkDuplicateUserName', function() {
    test('should return true when find user', function() {
      assert.isTrue(!!generator.checkDuplicateUserName('pcjpcj2', repository));
      assert.isFalse(!!generator.checkDuplicateUserName('pcjpcj3', repository));
    });

    test('should throw Error when length more than MAX_USER_NAME_LENGTH - PREFIX_LENGTH', function() {
      const longUserName = 'a'.repeat(MAX_USER_NAME_LENGTH);
      assert.throws(function() {
        generator.checkDuplicateUserName(longUserName, repository);
      });

      const longButNotMaxLengthUserName = 'a'.repeat(MAX_USER_NAME_LENGTH - PREFIX_LENGTH - 1);
      assert.doesNotThrow(function() {
        generator.checkDuplicateUserName(longButNotMaxLengthUserName, repository);
      });
    });
  });

  suite('#validateParameters', function() {
    test('should email and repository are validate parameters', function() {
      assert.doesNotThrow(function(){
        generator.validateParameters('pcjpcj2@gmail.com', repository);
      });

      let isValidated = generator.validateParameters('pcjpcj2@gmail.com', repository);
      assert.equal(isValidated, true);
    });

    test('should throw error when email is invalid',function(){
      let email = '';
      assert.throws(function(){
        generator.validateParameters(email, repository);
      });
    });

    test('should throw error when generator is invalid',function(){
      let email = 'pcjpcj2@gmail.com';
      assert.throws(function(){
        generator.validateParameters(email, undefined);
      });
    });

  });

  suite('#getRandomPostfix', function() {
    test('should have 3 characters alphabet and number, ', function() {
      const prefixerTester = /[a-zA-Z0-9]{3}/;
      assert.isTrue(prefixerTester.test(generator.getRandomPostfix()));
    });
  });
});
