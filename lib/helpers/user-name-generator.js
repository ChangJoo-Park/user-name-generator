import EmailValidator from './email-validator';
import UserRepository from '../services/user-repository';

class UserNameGenerator {
  generate(email, repository) {
    this.validateParameters(email, repository);

    const userName = EmailValidator.splitParts(email).local;
    let newUserName = userName;
    let user = repository.findByUserName(newUserName);
    while(user) {
      newUserName = this.randomize(newUserName);
      user = repository.findByUserName(newUserName);
    }
    return newUserName;
  }

  validateParameters(email, repository) {
    let isValidEmail = EmailValidator.validate(email);
    let isValidRepository = repository instanceof UserRepository;
    if(isValidEmail && isValidRepository) {
      return true;
    }
    let errorMessages = '';
    errorMessages += !isValidEmail ? '#validateParameters : Email is invalid.\n' : '';
    errorMessages += !isValidRepository ? '#validateParameters : given repository is not User Repository.\n' : '';
    throw new Error(errorMessages);
  }

  randomize(userName) {
    // same localpart + Maximum 238_328 cases random characters
    const appendableText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const numberOfAppendables = 62; // appendableText.length
    const numberOfCharacter = 3;
    for(let i = 0 ; i < numberOfCharacter; i++) {
      userName += appendableText.charAt(Math.floor(Math.random() * numberOfAppendables));
    }
    return userName;
  }
}

module.exports = UserNameGenerator;