class PhotographerFactory {
  constructor(cardObject, type) {
    if (type === "video") {
      return new PhotographerProfileTemplateV2(cardObject).createPostVideo();
    } else if (type === "image") {
      return new PhotographerProfileTemplateV2(cardObject).createPostImage();
    } else {
      throw "Photographer factory error: unknown type format";
    }
  }
}
