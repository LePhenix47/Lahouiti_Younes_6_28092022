class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  get setName() {
    return this.name;
  }
  get setId() {
    return this.id;
  }
  get setCity() {
    return this.city;
  }
  get setCountry() {
    return this.country;
  }
  get setSlogan() {
    return this.tagline;
  }
  get setPrice() {
    return this.price;
  }
  get setProfilePicture() {
    return this.portrait;
  }
}
