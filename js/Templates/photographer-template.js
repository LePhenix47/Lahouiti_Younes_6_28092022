class PhotographerProfileTemplate {
  constructor(cards) {
    this.cards = cards;
  }

  createProfile() {
    let profileTemplate = "";

    const { name, city, country, tagline, portrait } = this.cards;
    profileTemplate = `
          <section class="main__profile-container">
        <div class="profile__card-container">
          <div class="profile__card">
            <h1 class="profile__name">${name}</h1>
            <p class="profile__location">${city}, ${country}</p>
            <p class="profile__slogan">${tagline}</p>
          </div>
        </div>
        <div class="profile__contact">
          <button type="button" class="button button--rounded">Contactez-moi</button>
        </div>
        <div class="profile__image-container" title="Photo de profil du compte de: ${name}">
          <img src="../assets/images/Photographs Profile pictures/${portrait}" alt="Photo de profil du compte de: ${name}" class="profile__image">
        </div>
      </section>
        `;

    return profileTemplate;
  }

  createPosts() {
    let postTemplate = "";
    let postsCards = "";

    for (let card of this.cards) {
      const { id, photographerId, title, image, video, likes, date } = card;

      if (image !== undefined) {
        postTemplate = `
            <div class="images__post-container" data-post-id="${id}" data-photographers-id="${photographerId}">
                  <div class="images__post">
                    <a href="#" title="${title}">
                      <img class="images__image" src="../assets/images/Posts photos/${image}" alt="'${title}' fait le ${date}" loading="lazy">
                    </a>
                    <div class="images__post-text">
                      <p class="images__post-description">${title}</p>
                      <button class="images__post-like-button">${likes} <i class="fa-solid fa-heart"></i></button>
                    </div>
                  </div>
                </div>
                `;
      } else {
        postTemplate = `
            <div class="images__post-container" data-post-id="${id}" data-photographers-id="${photographerId}">
                  <div class="images__post">
                    <a href="#" title="${title}">
                <video src="../assets/images/Posts photos/${video}" class="images__image" ></video>
                    </a>
                    <div class="images__post-text">
                      <p class="images__post-description">${title}</p>
                      <button class="images__post-like-button">${likes} <i class="fa-solid fa-heart"></i></button>
                    </div>
                  </div>
                </div>
                `;
      }

      postsCards += postTemplate;
    }

    return postsCards;
  }
}
