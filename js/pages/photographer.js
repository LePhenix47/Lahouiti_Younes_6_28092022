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

  static getUserInfos(arrayOfUsers, urlIdOfPhotographer) {
    let photographerInfosObject = {};
    for (let i = 0; i < arrayOfUsers.length; i++) {
      let user = arrayOfUsers[i];
      const { id } = user;
      if (id === urlIdOfPhotographer) {
        photographerInfosObject = user;
      }
    }

    return photographerInfosObject;
  }

  static getPostsOfUser(arrayOfPosts, urlIdOfPhotographer) {
    let photographersPostsArray = [];
    for (let i = 0; i < arrayOfPosts.length; i++) {
      let post = arrayOfPosts[i];
      const { photographerId } = post;
      if (photographerId === urlIdOfPhotographer) {
        //If the ID of the photographer in the post corresponds to the ID in the parameters of the URL then you retrieve me ALL his posts
        photographersPostsArray.push(post);
      }
    }

    return photographersPostsArray;
  }

  //Static method that fills the profile infos
  static changeUIOfProfile(dataObject, container) {
    container.innerHTML = new PhotographerProfileTemplate(
      dataObject
    ).createProfile();
  }

  //Static method that fills the container for the posts
  static changeUIOfPosts(dataArray, container) {
    container.innerHTML = new PhotographerProfileTemplate(
      dataArray
    ).createPosts();
  }
}

const launchPhotographerApp = new PhotographerApp().main();

const profileContainer = document.querySelector(".main__profile-wrapper");

const postsContainer = document.querySelector(".images");
console.log(postsContainer);

let urlPhotographerId = Number(getParameter("id"));

let photographerObject = {};
let photographerMediaArray = [];

launchPhotographerApp.then((data) => {
  const { photographers, media } = data;
  // console.table(photographers);
  // console.table(media);
  photographerObject = PhotographerApp.getUserInfos(
    photographers,
    urlPhotographerId
  );

  photographerMediaArray = PhotographerApp.getPostsOfUser(
    media,
    urlPhotographerId
  );

  PhotographerApp.changeUIOfProfile(photographerObject, profileContainer);
  PhotographerApp.changeUIOfPosts(photographerMediaArray, postsContainer);
});

console.log("Id of photograph =", urlPhotographerId);
