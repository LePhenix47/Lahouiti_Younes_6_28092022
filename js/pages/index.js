class IndexApp {
  constructor() {
    this.cardsContainer = document.querySelector(".main__cards-container");
    this.usersDataApi = new PhotographersApi("../../data/photographers.json");
  }

  async main() {
    const photosData = await this.usersDataApi.getPhotos();
  }
}
