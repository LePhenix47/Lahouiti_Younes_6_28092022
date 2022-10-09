//Mettre le code JavaScript lié à la page photographer.html

class PhotographerApp {
  constructor() {
    this.usersDataApi = new PhotographersApi(
      "http://127.0.0.1:5500/P6/workstation/data/photographers.json"
    );
  }

  //Retrives the data from the JSON file
  main() {
    const photosData = this.usersDataApi.getPhotos();
    console.log({ photosData });
    return photosData;
  }

  static getInfosOfPhotographer(arrayOfUsers, urlIdOfPhotographer) {
    let photographerInfosObject = {};
    for (let i = 0; i < arrayOfUsers.length; i++) {
      let user = arrayOfUsers[i];
      const { id } = user;
      if (id === urlIdOfPhotographer) {
        photographerInfosObject = user;
      }
    }
    amountOfLikesParagraph.innerHTML = `${amountOfLikes} <i class="fa-solid fa-heart"></i>`;
    priceParagraph.textContent = `${photographerObject.price}€ / jour`;
    descriptionMetaTag.setAttribute(
      "description",
      `Découvrez les photos prises par ${photographerObject.name}!`
    );
    titleMetaTag.textContent = `Fisheye - ${photographerObject.name}`;

    return photographerInfosObject;
  }

  static getPostsOfPhotographer(arrayOfPosts, urlIdOfPhotographer) {
    let photographersPostsArray = [];

    photographersPostsArray = arrayOfPosts.filter((post) => {
      return post.photographerId === urlIdOfPhotographer;
    });

    return photographersPostsArray;
  }

  static sortPostsByProperty(arrayOfPosts, sortProperty) {
    let sortedArray = [];
    switch (sortProperty) {
      case "title": {
        sortedArray = arrayOfPosts.sort((post1, post2) => {
          return post2.title - post1.title;
        });
        break;
      }
      case "likes": {
        sortedArray = arrayOfPosts.sort((post1, post2) => {
          return post2.likes - post1.likes;
        });
        break;
      }
      case "date": {
        sortedArray = arrayOfPosts.sort((post1, post2) => {
          return post2.date - post1.date;
        });
        break;
      }
    }

    return sortedArray;
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

  static updateUIOfStickyBar(photographerObject, data) {
    let updatedStickyBar = new StickyBarTemplate(
      photographerObject,
      data
    ).updateStickyBar();
  }

  static changeUIOfStickyBar(photographerObject, data) {
    let newStickyBar = new StickyBarTemplate(
      photographerObject,
      data
    ).createStickyBar();
  }
}

//DOM elements
const profileContainer = document.querySelector(".main__profile-wrapper");

const postsContainer = document.querySelector(".images");

const amountOfLikesParagraph = document.querySelector(".main__amount-of-likes");

const priceParagraph = document.querySelector(".main__price");

const titleMetaTag = document.querySelector("title");

const descriptionMetaTag = document.querySelector("meta[name=description]");

//
const launchPhotographerApp = new PhotographerApp().main();

console.log(postsContainer);

//
let urlPhotographerId = Number(getUrlParameter("id"));

let photographerObject = {};
let photographerMediaArray = [];
let arrayOfLikes = [];

let arrayOfImageLinks = [];
let arrayOfVideoLinks = [];

let amountOfLikes = 0;

let profileData = {};
console.log(launchPhotographerApp);
//
launchPhotographerApp.then((data) => {
  const { photographers, media } = data;
  photographerObject = PhotographerApp.getInfosOfPhotographer(
    photographers,
    urlPhotographerId
  );

  photographerMediaArray = PhotographerApp.getPostsOfPhotographer(
    media,
    urlPhotographerId
  );

  //Initialising different arrays

  arrayOfLikes = photographerMediaArray.map((media) => {
    return media.likes;
  });
  arrayOfImageLinks = photographerMediaArray.map((media) => {
    return media.image;
  });

  arrayOfVideoLinks = photographerMediaArray.map((media) => {
    return media.video;
  });

  amountOfLikes = arrayOfLikes.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });
  //Data for the sticky bar
  let stickyBarData = {
    amountOfLikesParagraph,
    priceParagraph,
    titleMetaTag,
    descriptionMetaTag,
    amountOfLikes,
  };

  //Calling static methods to add fill the page
  PhotographerApp.changeUIOfStickyBar(photographerObject, stickyBarData);
  PhotographerApp.changeUIOfProfile(photographerObject, profileContainer);
  PhotographerApp.changeUIOfPosts(photographerMediaArray, postsContainer);

  console.dir(photographerObject);
  console.table(photographerMediaArray);

  console.table(arrayOfLikes);
  console.log("Amount of likes = ", amountOfLikes);

  /* 
  CODE TO BE REFACTORED!!
  ↓
  */

  //Code for the contact modal
  const contactButton = profileContainer.querySelector(".button");

  const postsCard = postsContainer.querySelectorAll(".images__post-container");
  const postsCardArray = Array.from(postsCard);

  //Sorted arrays
  let arrayOfPostsSortedByLikes = PhotographerApp.sortPostsByProperty(
    photographerMediaArray,
    "likes"
  );
  let arrayOfPostsSortedByDate = PhotographerApp.sortPostsByProperty(
    photographerMediaArray,
    "date"
  );
  let arrayOfPostsSortedByTitle = PhotographerApp.sortPostsByProperty(
    photographerMediaArray,
    "title"
  );

  //Code for the contact modal
  contactButton.addEventListener("click", displayContactModal);

  //Code to sort the posts
  const selectSortElement = document.querySelector("select");

  selectSortElement.addEventListener("click", sortPosts);

  //Code for the lightbox-carousel modal
  console.log({ arrayOfPostsSortedByLikes });
  for (post of postsCardArray) {
    const linkToOpenModal = post.querySelector("a[href]");
    linkToOpenModal.addEventListener("click", displayLightboxModal);

    const likeButton = post.querySelector(".images__post-like-button");
    likeButton.addEventListener("click", addLikeToPost);
  }

  /* 
  ↑
  CODE TO BE REFACTORED!!
  */
  console.log(contactButton);
});

console.log("Id of photograph =", urlPhotographerId);
