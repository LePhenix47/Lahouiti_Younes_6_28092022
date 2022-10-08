class IndexApp {
  constructor() {
    this.usersDataApi = new PhotographersApi(
      "http://127.0.0.1:5500/P6/workstation/data/photographers.json"
    );
  }

  async main() {
    const photosData = await this.usersDataApi.getPhotos();

    return photosData;
  }

  static init(dataArray, container) {
    container.innerHTML = new UserCardTemplate(dataArray).createCards();
  }
}

const launchApp = new IndexApp().main();

let cardsContainer = document.querySelector(".main__cards-container");

launchApp.then((data) => {
  const { photographers, media } = data;
  console.table(photographers);
  IndexApp.init(photographers, cardsContainer);
});
