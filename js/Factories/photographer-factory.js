class PhotographerFactory {
  constructor(card, type) {
    if (type === "video") {
      console.log("Type is a video");
      return new PhotographerProfileTemplateV2(card).createPostVideo();
    } else if (type === "image") {
      console.log("Type is an image");
      return new PhotographerProfileTemplateV2(card).createPostImage();
    } else {
      throw "Photographer factory error: unknown type format";
    }
  }
}
