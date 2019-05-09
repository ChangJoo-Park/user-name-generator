import EmailValidator from './email-validator';
import UserRepository from '../services/user-repository';
import { MAX_USER_NAME_LENGTH, PREFIX_LENGTH } from '../generator.config';

class UserNameGenerator {
  generate(email, repository) {
    this.validateParameters(email, repository);

    let newUserName = EmailValidator.splitParts(email).local;

    while(this.checkDuplicateUserName(newUserName, repository)) {
      newUserName += this.getRandomPostfix();
    }

    return newUserName;
  }

  checkDuplicateUserName(userName, repository) {
    if(userName.length > (MAX_USER_NAME_LENGTH - PREFIX_LENGTH)) {
      throw new Error(`User name is too long maximum : ${MAX_USER_NAME_LENGTH}`);
    }

    const duplicateUser = repository.findByUserName(userName);
    return !!duplicateUser;
  }

  validateParameters(email, repository) {
    const isValidEmail = EmailValidator.validate(email);
    const isValidRepository = repository instanceof UserRepository;

    if(isValidEmail && isValidRepository) {
      return true;
    }

    let errorMessages = '';
    errorMessages += !isValidEmail ? '#validateParameters : Email is invalid.\n' : '';
    errorMessages += !isValidRepository ? '#validateParameters : given repository is not User Repository.\n' : '';

    throw new Error(errorMessages);
  }

  getRandomPostfix() {
    // same localpart + Maximum 238_328 cases random characters
    const appendableText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const numberOfAppendables = 62; // appendableText.length
    let randomPrefix = '';
    for(let i = 0 ; i < PREFIX_LENGTH; i++) {
      randomPrefix += appendableText.charAt(Math.floor(Math.random() * numberOfAppendables));
    }

    return randomPrefix;
  }
}

module.exports = UserNameGenerator;
