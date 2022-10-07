//Mettre le code JavaScript lié à la page photographer.html

class PhotographerApp {
  constructor() {
    this.usersDataApi = new PhotographersApi(
      "http://127.0.0.1:5500/P6/workstation/data/photographers.json"
    );
  }

  //Retrives the data from the JSON file
  async main() {
    const photosData = await this.usersDataApi.getPhotos();

    return photosData;
  }

  //Static method that fills the profile infos
  static fillProfile(dataArray, container) {
    console.log("container: \n", container);
    for (let data of dataArray) {
      let card = new PhotographerProfileTemplate(data).createProfileCard(
        container
      );
    }
  }

  //Static method that fills the container for the posts
  static fillPosts(dataArray, container) {
    console.log("container: \n", container);
    for (let data of dataArray) {
      let card = new PhotographerProfileTemplate(data).createPostsCard(
        container
      );
    }
  }
}
