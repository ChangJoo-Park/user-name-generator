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
  /*
    http://www.ex-parrot.com/~pdw/Mail-RFC822-Address.html
    http://emailregex.com/
    Start with alphabet and numbers, special character only  '-','_'
    domain part is not case sensitive.
    NOTE: is better?
    "simple email validation" -> "send activate email to user" -> "activate"
  */
  suite('#validate', function() {
    test('should return false empty email', function() {
      assert.isFalse(EmailValidator.validate(''));
      assert.isFalse(EmailValidator.validate(undefined));
      assert.isFalse(EmailValidator.validate(null));
    });

    test('should return false invalid type of email', function() {
      assert.isFalse(EmailValidator.validate('Abc.example.com'));
      assert.isFalse(EmailValidator.validate('A@b@c@example.com'));
      assert.isFalse(EmailValidator.validate('john..doe@example.com'));
      assert.isFalse(EmailValidator.validate('john.doe@example..com'));
      assert.isFalse(EmailValidator.validate('a@a'));
    });

    test('should local part start with a-z, A-Z, 0-9.', function() {
      assert.isFalse(EmailValidator.validate('!pcjpcj2@gmail.com'));
      assert.isFalse(EmailValidator.validate('+pcjpcj2@gmail.com'));
      assert.isFalse(EmailValidator.validate('~pcjpcj2@gmail.com'));
    });

    test('should domain part has lower case.', function() {
      assert.isFalse(EmailValidator.validate('pcjpcj2@Gmail.com'));
      assert.isFalse(EmailValidator.validate('pcjpcj2@NAVER.COM'));
      assert.isTrue(EmailValidator.validate('pcjpcj2@naver.com'));
    });

    test('should domain part does not have more than 3 parts.', function() {
      assert.isTrue(EmailValidator.validate('pcjpcj2@gmail.com'));
      assert.isTrue(EmailValidator.validate('pcjpcj2@gmail.co.kr'));
      assert.isFalse(EmailValidator.validate('pcjpcj2@gmail.co.kr.not.kr'));
    });
  });
});
