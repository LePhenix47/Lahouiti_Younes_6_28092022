//Function for the contact modal
const modalContact = document.querySelector(".contact__modal");

function displayContactModal() {
  //Adds the fade-in animation whenever the user opens the modal window and removes its class after the animation finished
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

  //Adds the fade-in animation whenever the user opens the modal window and removes its class after the animation finished
  closeModalButton.addEventListener("click", () => {
    modalContact.classList.add("fade-out");
    setTimeout(() => {
      modalContact.classList.remove("fade-out");
      modalContact.close();
    }, 250);
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
}
