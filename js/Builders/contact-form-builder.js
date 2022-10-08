class ContactFormBuilder {
  constructor() {}

  setFirstName(firstName) {
    this.firstName = firstName;
    return this;
  }
  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }
}
