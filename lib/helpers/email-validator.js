class EmailValidator {
  static validate(email) {
    if(!email) {
      return false;
    }

    if(email.length > 320) { // local(64) + @ + domain(255)
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/;
    if(!emailRegex.test(email)) {
      return false;
    }

    const parts = this.splitParts(email);
    if(parts.local.length > 64 || parts.domain.length > 255) {
      return false;
    }

    return true;
  }

  static splitParts(email) {
    let splitedEmail = email.split('@');
    return {local: splitedEmail[0], domain: splitedEmail[1]};
  }
}

module.exports = EmailValidator;