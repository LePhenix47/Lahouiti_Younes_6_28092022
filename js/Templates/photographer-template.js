class PhotographerProfileTemplate {
  constructor(card) {
    this.card = card;
  }

  createProfileCard() {
    const { name, id, city, country, tagline, price, portrait } = this.card;
    const photographersProfile = `
    <section class="main__profile-container">

        <div class="profile__card-container">
          <div class="profile__card">
            <h1 class="profile__name">${name}</h1>
            <p class="profile__location">${city},${country}</p>
            <p class="profile__slogan">${tagline}</p>
          </div>
        </div>
        <div class="profile__contact">
          <button type="button" class="button button--rounded">Contactez-moi</button>
        </div>
        <div class="profile__image-container">
          <img src="./assets/images/Photographs Profile pictures/${portrait}" alt="Photo de profil du compte de: ${name}" class="profile__image">
        </div>
      </section>`;
  }

  createPostsCard() {
    const { id, photographersId, title, image, video, likes, date, price } =
      this.card;
    const photographersPosts = ` 
     <div class="images__post-container" data-post-id="${id}" data-photographers-id="${photographersId}">
            <div class="images__post">
              <a href="#" title="${title}">

                <img class="images__image" src="${image}" alt="'${title}' fait le ${date}">
                <video src="${video}" ></video>
              </a>
              <div class="images__post-text">
                <p class="images__post-description">${title}</p>
                <button class="images__post-like-button">${likes} <i class="fa-solid fa-heart"></i></button>
              </div>
            </div>
          </div>
    `;
  }
}
