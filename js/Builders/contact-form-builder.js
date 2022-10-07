class ContactFormBuilder {
  constructor() {}

  set firstName(firstName) {
    this.firstName = firstName;
  }
  set lastName(lastName) {
    this.lastName = lastName;
  }

  set email(email) {
    this.email = email;
  }

  set message(message) {
    this.message = message;
  }

  //Builder
  build() {
    return this;
  }
}
