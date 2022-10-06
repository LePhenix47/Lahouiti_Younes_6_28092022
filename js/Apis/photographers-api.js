class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    let data = undefined;
    try {
      let response = await fetch(this.url);
      data = await response.json();
      if (data === undefined) {
        throw "Data is undefined";
      }
    } catch (apiError) {
      console.error(apiError);
      data = apiError;
    }
    return data;
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
