class StickyBarTemplate {
  constructor(data, photographerObject) {
    this.data = data;
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
    priceParagraph.textContent = `${photographerObject.price}€ / jour`;
    descriptionMetaTag.setAttribute(
      "content",
      `Découvrez les photos prises par ${photographerObject.name}!`
    );
    titleMetaTag.textContent = `Fisheye - ${photographerObject.name}`;
  }

  updateStickyBar() {
    console.log(this.photographerObject);
    const { amountOfLikesParagraph, amountOfLikes } = this.photographerObject;
    amountOfLikesParagraph.innerHTML = `${amountOfLikes} <i class="fa-solid fa-heart"></i>`;
  }
}
