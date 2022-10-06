class Media {
  constructor(data) {
    this.id = data.id;
    this.photographersId = data.photographersId;
    this.title = data.title;
    this.image = data.image;
    this.video = data.video;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  get id() {
    return this.id;
  }
  get photographersId() {
    return this.photographersId;
  }
  get title() {
    return this.title;
  }
  get image() {
    return this.image;
  }
  get video() {
    return this.video;
  }
  get likes() {
    return this.likes;
  }
  get date() {
    return this.date;
  }
  get price() {
    return this.price;
  }

  //Builder
  build() {
    return this;
  }
}
