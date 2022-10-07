class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    let data = undefined;
    try {
      let response = await fetch(this.url);

      if (!response.ok) {
        throw `An error has occured while attempting to retrieve data: ${response}`;
      }
      data = await response.json();
      return data;
    } catch (apiError) {
      console.log(
        "%c" + apiError,
        "padding: 10px; font-size: 24px; background: crimson"
      );
      data = apiError;
      return data;
    }
  }
}

class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }

  async getPhotos() {
    return await this.get();
  }
}
