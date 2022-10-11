class PhotographerProfileTemplate {
  constructor(cards) {
    this.cards = cards;
  }

  createProfile() {
    let profileTemplate = "";

    const { name, city, country, tagline, portrait } = this.cards;
    profileTemplate = `
        <section class="main__profile-container" role="region" tabindex="0">
        <div class="profile__card-container">
          <div class="profile__card" tabindex="0">
            <h1 class="profile__name" tabindex="0">${name}</h1>
            <h2 class="profile__location" tabindex="0">${city}, ${country}</h2>
            <h3 class="profile__slogan" tabindex="0">${tagline}</h3>
          </div>
        </div>
        <div class="profile__contact">
          <button type="button" class="button button--rounded" tabindex="0">Contactez-moi</button>
        </div>
        <div class="profile__image-container">
          <img src="../assets/images/Photographs Profile pictures/${portrait}"
            alt="Photo de profil du compte de: ${name}" class="profile__image" tabindex="0" />
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
        <div class="images__post-container" data-post-id="${id}" data-photographers-id="${photographerId}"
            data-publishing-date="${date}" data-likes="${likes}" data-user-liked="false" data-title="${title}">
            <div class="images__post" tabindex="0">
              <a href="#" title="${title}" role="link" tabindex="0">
                <img class="images__image" src="../assets/images/Posts photos/${image}"
                  alt="'${title}' fait en ${new Date(date).getFullYear()}" />
              </a>
              <div class="images__post-text tabindex="0"">
                <p class="images__post-description" tabindex="0">${title}</p>
                <button class="images__post-like-button" title="Mettre un like au post '${title}'?"
                  aria-pressed="false">${likes} <i class="fa-solid fa-heart"></i></button>
              </div>
            </div>
          </div>

                `;
      } else {
        postTemplate = `
            
         <div class="images__post-container" data-post-id="${id}" data-photographers-id="${photographerId}"
            data-publishing-date="${date}" data-likes="${likes}" data-user-liked="false" data-title="${title}">

            <div class="images__post" tabindex="0">

              <a href="#" title="${title}" role="link" tabindex="0">
                <video src="../assets/images/Posts photos/${video}" class="images__video">
                </video>
              </a>

              <div class="images__post-text" tabindex="0">
                <p class="images__post-description" tabindex="0">${title}</p>
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
