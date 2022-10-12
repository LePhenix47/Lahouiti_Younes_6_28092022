class StickyBarTemplate {
  constructor(photographerObject) {
    this.photographerObject = photographerObject;
  }

  createStickyBar() {
    console.log("this.photographerObject = ", this.photographerObject);

    const {
      amountOfLikesParagraph,
      priceParagraph,
      descriptionMetaTag,
      titleMetaTag,
      amountOfLikes,
    } = this.photographerObject;

    amountOfLikesParagraph.innerHTML = `${amountOfLikes} <i class="fa-solid fa-heart"></i>`;
    amountOfLikesParagraph.setAttribute(
      "aria-label",
      `Le photographe accumule ${amountOfLikes} likes`
    );
    priceParagraph.textContent = `${photographerObject.price}€ / jour`;
    profileContainer.setAttribute(
      "aria-label",
      `
    Et le tarif du photographe à partir de ${photographerObject.price} euros par jour`
    );
    descriptionMetaTag.setAttribute(
      "content",
      `Découvrez les photos prises par ${photographerObject.name}!`
    );
    titleMetaTag.textContent = `Fisheye - Page du compte de ${photographerObject.name}`;
  }

  updateStickyBar() {
    console.log(this.photographerObject);
    const { amountOfLikesParagraph, amountOfLikes } = this.photographerObject;
    amountOfLikesParagraph.innerHTML = `${amountOfLikes} <i class="fa-solid fa-heart"></i>`;
  }
}
