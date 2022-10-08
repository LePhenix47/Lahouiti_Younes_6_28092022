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
let urlPhotographerId = Number(getParameter("id"));

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
  const modalContact = document.querySelector(".contact__modal");
  const modalLightbox = document.querySelector(".lightbox__modal");

  const postsCard = postsContainer.querySelectorAll(".images__post-container");
  const postsCardArray = Array.from(postsCard);

  //Code for the contact modal
  contactButton.addEventListener("click", () => {
    modalContact.classList.add("fade-in");
    setTimeout(() => {
      modalContact.classList.remove("fade-in");
    }, 250);
    modalContact.showModal();
    const closeModalButton = modalContact.querySelector(
      ".contact__button-close-dialog"
    );

    let formBuilder = new ContactFormBuilder();

    formBuilder
      .setFirstName("fName")
      .setLastName("lName")
      .setEmail("email")
      .setMessage("test 1234");

    console.log(formBuilder);

    closeModalButton.addEventListener("click", () => {
      modalContact.classList.add("fade-out");
      setTimeout(() => {
        modalContact.classList.remove("fade-out");
        modalContact.close();
      }, 250);
    });
  });

  //Code for the lightbox-carousel modal
  for (post of postsCardArray) {
    const linkToOpenModal = post.querySelector("a[href]");
    linkToOpenModal.addEventListener("click", (e) => {
      e.preventDefault();
      modalLightbox.classList.add("fade-in");
      setTimeout(() => {
        modalLightbox.classList.remove("fade-in");
      }, 250);
      modalLightbox.showModal();

      const carouselInfo = {
        direction: 0,
        actualIndex: 0,
        nextIndex: 0,
      };

      const closeModalButton = modalLightbox.querySelector(
        ".lightbox__button-close-dialog"
      );

      const nextButton = modalLightbox.querySelector(".lightbox__button-next");
      const previousButton = modalLightbox.querySelector(
        ".lightbox__button-previous"
      );

      closeModalButton.addEventListener("click", () => {
        modalLightbox.classList.add("fade-out");
        setTimeout(() => {
          modalLightbox.classList.remove("fade-out");
          modalLightbox.close();
        }, 250);
      });
    });

    //Should use an Observer pattern here

    const likeButton = post.querySelector(".images__post-like-button");
    likeButton.addEventListener("click", (e) => {
      console.log("click");

      let likeButtonHasAlreadyBeenPressed =
        likeButton.classList.contains("active-like");

      let postLikes = Number(likeButton.textContent);
      console.log({ postLikes });

      if (likeButtonHasAlreadyBeenPressed) {
        likeButton.classList.remove("active-like");
        amountOfLikes--;
        postLikes--;
        likeButton.innerHTML = `${postLikes} <i class="fa-solid fa-heart"></i>`;
        console.log("True → disliking");
        console.log(likeButton.textContent);
        console.log(amountOfLikes);
      } else {
        likeButton.classList.add("active-like");
        amountOfLikes++;
        postLikes++;
        likeButton.innerHTML = `${postLikes} <i class="fa-solid fa-heart"></i>`;
        console.log("False → liking");
        console.log(likeButton.textContent);
        console.log(amountOfLikes);
      }
    });
  }

  /* 
  CODE TO BE REFACTORED!!
  */
  console.log(contactButton);
});

console.log("Id of photograph =", urlPhotographerId);
