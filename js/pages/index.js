class IndexApp {
  constructor() {
    this.cardsContainer = document.querySelector(".main__cards-container");
    this.usersDataApi = new PhotographersApi(
      "http://127.0.0.1:5500/P6/workstation/data/photographers.json"
    );
  }

  //Retrives the data from the JSON file
  async main() {
    const photosData = await this.usersDataApi.getPhotos();

    return photosData;
  }

  //Static method that allows to "initialize" the page by filling the container with cards
  static init(dataArray, container) {
    console.log("container: \n", container);
    for (let data of dataArray) {
      let card = new UserCardTemplate(data).createCards(container);
    }
  }
}

const launchApp = new IndexApp().main();

let cardsContainer = document.querySelector(".main__cards-container");

launchApp.then((data) => {
  const { photographers, media } = data;
  console.table(photographers);
  IndexApp.init(photographers, cardsContainer);
});
