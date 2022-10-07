class UserCardTemplate {
  constructor(card) {
    this.card = card;
  }

  createCards(container) {
    const { name, id, city, country, tagline, price, portrait } = this.card;
    const photographerCard = `
    <section class="card" role="region">
          <a class="card__photograph-profile" title="Visiter la page de profil de ${name}?" href="./html/photographer.html?id=${id}" target="blank">
            <h2 class="card__name">
            <img
                src="./assets/images/Photographs Profile pictures/${portrait}"
                alt="Photo de profil de: ${name}" class="card__image">${name}
            </h2>
          </a>
          <div class="card__text-container">
            <p class="card__location">${city}, ${country}</p>
            <p class="card__slogan">${tagline}</p>
            <p class="card__invoice">${price}€/jour</p>
          </div>
        </section>`;

    container.innerHTML += photographerCard;
    return container;
  }
}
