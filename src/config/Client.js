export class ClientConfig {

  #sellerId = null;
  #clientId = null;
  #secret = null;

  get sellerId() {
    return this.#sellerId;
  }

  set sellerId(value) {
    this.#sellerId = value;
  }

  get clientId() {
    return this.#clientId;
  }

  set clientId(value) {
    this.#clientId = value;
  }

  get secret() {
    return this.#secret;
  }

  set secret(value) {
    this.#secret = value;
  }

}

export default class Singleton {

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new ClientConfig();
    }
  }

  getInstance() {
    return Singleton.instance;
  }

}
