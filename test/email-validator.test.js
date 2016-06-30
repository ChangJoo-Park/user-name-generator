import Mocha from 'mocha';
import { assert } from 'chai';
const { suite, test} = Mocha;
import EmailValidator from '../lib/helpers/email-validator';


suite('EmailValidator', function() {
  suite('#splitParts', function() {
    test('should split local and domain parts', function(){
      let splittedEmail = EmailValidator.splitParts('pcjpcj2@gmail.com');
      assert.equal(splittedEmail.local, 'pcjpcj2');
      assert.equal(splittedEmail.domain, 'gmail.com');
    });
  });

  suite('#validate', function() {
    test('should return false empty email', function() {
      assert.isNotTrue(EmailValidator.validate(''));
      assert.isNotTrue(EmailValidator.validate(undefined));
      assert.isNotTrue(EmailValidator.validate(null));
    });

    test('should return false invalid type of email', function() {
      assert.isNotTrue(EmailValidator.validate('Abc.example.com'));
      assert.isNotTrue(EmailValidator.validate('A@b@c@example.com'));
      assert.isNotTrue(EmailValidator.validate('john..doe@example.com'));
      assert.isNotTrue(EmailValidator.validate('john.doe@example..com'));
      assert.isNotTrue(EmailValidator.validate('a@a'));
    });
  });
});
