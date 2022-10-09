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
    amountOfLikesParagraph.innerHTML = `${amountOfLikes} <i class="fa-solid fa-heart"></i>`;
    priceParagraph.textContent = `${photographerObject.price}€ / jour`;
    descriptionMetaTag.setAttribute(
      "description",
      `Découvrez les photos prises par ${photographerObject.name}!`
    );
    titleMetaTag.textContent = `Fisheye - ${photographerObject.name}`;

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

  static sortPostsByUser(arrayOfPosts, sortProperty) {
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

  static changeUIOfStickyBar(photographerObject, data) {
    const {
      amountOfLikesParagraph,
      priceParagraph,
      descriptionMetaTag,
      titleMetaTag,
      amountOfLikes,
    } = data;
    amountOfLikesParagraph.innerHTML = `${amountOfLikes} <i class="fa-solid fa-heart"></i>`;
    priceParagraph.textContent = `${photographerObject.price}€ / jour`;
    descriptionMetaTag.setAttribute(
      "content",
      `Découvrez les photos prises par ${photographerObject.name}!`
    );
    titleMetaTag.textContent = `Fisheye - ${photographerObject.name}`;
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
let amountOfLikes = 0;

let profileData = {};

//
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

  arrayOfLikes = photographerMediaArray.map((media) => {
    return media.likes;
  });

  amountOfLikes = arrayOfLikes.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });

  stickyBarData = {
    amountOfLikesParagraph,
    priceParagraph,
    titleMetaTag,
    descriptionMetaTag,
    amountOfLikes,
  };

  PhotographerApp.changeUIOfStickyBar(photographerObject, stickyBarData);
  PhotographerApp.changeUIOfProfile(photographerObject, profileContainer);
  PhotographerApp.changeUIOfPosts(photographerMediaArray, postsContainer);

  console.dir(photographerObject);
  console.table(photographerMediaArray);

  console.table(arrayOfLikes);
  console.log("Amount of likes = ", amountOfLikes);

  /* 
  CODE TO BE REFACTORED!!
  */
  //Code for the contact modal
  const contactButton = profileContainer.querySelector(".button");

  const postsCard = postsContainer.querySelectorAll(".images__post-container");
  const postsCardArray = Array.from(postsCard);

  //Code for the contact modal
  contactButton.addEventListener("click", displayContactModal);

  //Sorted arrays
  let arrayOfPostsSortedByLikes = PhotographerApp.sortPostsByUser(
    photographerMediaArray,
    "likes"
  );
  let arrayOfPostsSortedByDate = PhotographerApp.sortPostsByUser(
    photographerMediaArray,
    "date"
  );
  let arrayOfPostsSortedByTitle = PhotographerApp.sortPostsByUser(
    photographerMediaArray,
    "title"
  );

  //Code for the lightbox-carousel modal
  console.log({ arrayOfPostsSortedByLikes });
  for (post of postsCardArray) {
    const linkToOpenModal = post.querySelector("a[href]");
    linkToOpenModal.addEventListener("click", displayLightboxModal);

    //Should use an Observer pattern here

    const likeButton = post.querySelector(".images__post-like-button");
    likeButton.addEventListener("click", addLikeToPost);
  }

  /* 
  CODE TO BE REFACTORED!!
  */
  console.log(contactButton);
});

console.log("Id of photograph =", urlPhotographerId);
