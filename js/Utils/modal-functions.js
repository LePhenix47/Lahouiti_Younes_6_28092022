//Function for the contact modal
const modalContact = document.querySelector(".contact__modal");

function displayContactModal() {
  //Adds the fade-in animation whenever the user opens the modal window and removes its class after the animation finished
  modalContact.classList.add("fade-in");
  setTimeout(() => {
    modalContact.classList.remove("fade-in");
  }, 250);

  modalContact.showModal();

  let formBuilder = new ContactFormBuilder();

  formBuilder
    .setFirstName("fName")
    .setLastName("lName")
    .setEmail("email")
    .setMessage("test 1234");

  console.log(formBuilder);

  //
  const closeModalButton = modalContact.querySelector(
    ".contact__button-close-dialog"
  );
  //Adds the fade-in animation whenever the user opens the modal window and removes its class after the animation finished
  closeModalButton.addEventListener("click", () => {
    closeModalSmoothly(modalContact);
  });
}

//Function for the lightbox-carousel modal
const modalLightbox = document.querySelector(".lightbox__modal");

function displayLightboxModal(e) {
  e.preventDefault();
  modalLightbox.classList.add("fade-in");
  modalLightbox.showModal();
  setTimeout(() => {
    modalLightbox.classList.remove("fade-in");
  }, 250);

  console.log(e.target);
  console.log(this);

  //This array contains the different image urls
  let arrayOfImages = photographerMediaArray.map((post) => {
    return post.image || post.video;
  });

  console.table(arrayOfImages);

  //Constants to get the URL, the file name and the title of the image
  const imageUrl = e.currentTarget.children[0].getAttribute("src");
  const imageFileName = imageUrl.split("/Posts photos/")[1];
  const imageTitle = e.currentTarget.getAttribute("title");
  console.log({ imageUrl, imageFileName, imageTitle });

  updateModalImage(
    modalLightbox,
    imageFileName,
    imageTitle,
    imageUrl.includes(".mp4") ? "video" : "image"
  );
  //
  const nextButton = modalLightbox.querySelector(".lightbox__button-next");
  const previousButton = modalLightbox.querySelector(
    ".lightbox__button-previous"
  );

  nextButton.addEventListener("click", (event) => {
    changeImage(arrayOfImages, imageFileName, event, modalLightbox);
  });
  previousButton.addEventListener("click", (event) => {
    changeImage(arrayOfImages, imageFileName, event, modalLightbox);
  });

  //
  const closeModalButton = modalLightbox.querySelector(
    ".lightbox__button-close-dialog"
  );

  closeModalButton.addEventListener("click", () => {
    closeModalSmoothly(modalLightbox);
  });
}

//Function that closes the modal window with a fade out animation
function closeModalSmoothly(modal) {
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal.classList.remove("fade-out");
    modal.close();
  }, 250);
}

/*
  This object will contain ALL the useful informations to navigate between the different images
  Here's how it works:
  
  Direction → Used to know if the user clicked the previous or next image
  Actual Index → Index of the image in the modal that the user clicked 
  Next Index → Index of either the previous or next image, dependant on the Actual Index and the Direction
  */
const carouselInfo = {
  direction: 0,
  actualIndex: 0,
  nextIndex: 0,
};
//Function that changes the image displayed in the modal window of the lightbox
function changeImage(
  arrayOfImageFileNames,
  currentImageFileName,
  event,
  modal
) {
  carouselInfo.actualIndex =
    arrayOfImageFileNames.indexOf(currentImageFileName);

  carouselInfo.direction = event.target.classList.contains("fa-chevron-left")
    ? -1
    : 1;

  let userClicksNextOnLastImage =
    carouselInfo.direction + carouselInfo.actualIndex >
    arrayOfImageFileNames.length - 1;

  let userClicksPreviousOnFirstImage =
    carouselInfo.direction + carouselInfo.actualIndex < 0;

  if (userClicksNextOnLastImage) {
    carouselInfo.nextIndex = 0;
  } else if (userClicksPreviousOnFirstImage) {
    carouselInfo.nextIndex = arrayOfImageFileNames.length - 1;
  } else {
    carouselInfo.nextIndex = carouselInfo.direction + carouselInfo.actualIndex;
  }
  console.log(
    "%c" + JSON.stringify(carouselInfo),
    "background: green; font-size: 20px; padding: 5px"
  );

  console.log(
    arrayOfImageFileNames[carouselInfo.actualIndex],
    arrayOfImageFileNames[carouselInfo.nextIndex]
  );
}

function updateModalImage(modal, imageUrl, imageTitle, videoOrImage = "image") {
  const imageElement = modal.querySelector(".lightbox__image");
  const videoElement = modal.querySelector(".lightbox__video");
  const imageDescriptionElement = modal.querySelector(
    ".lightbox__post-description"
  );

  if (videoOrImage === "image") {
    //Element to be hidden
    videoElement.classList.add("hide");
    //Element to be added
    imageElement.classList.remove("hide");
    imageElement.setAttribute(
      "src",
      `../assets/images/Posts photos/${imageUrl}`
    );
  } else {
    //Element to be hidden
    imageElement.classList.add("hide");
    //Element to be added
    videoElement.classList.remove("hide");
    videoElement.setAttribute(
      "src",
      `../assets/images/Posts photos/${imageUrl}`
    );
  }

  imageDescriptionElement.textContent = imageTitle;
}
