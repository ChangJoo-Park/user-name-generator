import Mocha from 'mocha';
import { assert } from 'chai';
const { suite, setup, teardown, test} = Mocha;
import UserNameGenerator from '../lib/helpers/user-name-generator';
import UserMockRepository from '../lib/services/user-mock-repository';

suite('UserNameGenerator', function() {
  suite('#generate', function() {
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

    test('should generate unique name', function() {
      let email = 'pcjpcj2@gmail.com';
      let userName = generator.generate(email, repository);
      let user = repository.findByUserName(userName);
      assert.isUndefined(user);
    });
  });

  suite('#validateParameters', function() {
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

  suite('#randomize', function() {
    let generator = undefined;
    setup(function(){
      generator = new UserNameGenerator();
    });

    teardown(function(){
      generator = undefined;
    });

    test('should randomize name', function() {
      for(let i = 0; i < 10000; i++){
        let name = generator.randomize('pcjpcj2');
        assert.notEqual(name, 'pcjpcj2');
      }
    });
  });
});
