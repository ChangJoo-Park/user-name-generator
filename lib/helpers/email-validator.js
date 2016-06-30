class EmailValidator {
  static validate(email) {
    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    // http://www.ex-parrot.com/~pdw/Mail-RFC822-Address.html
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  static splitParts(email) {
    let splitedEmail = email.split('@');
    return {local: splitedEmail[0], domain: splitedEmail[1]};
  }
}

module.exports = EmailValidator;