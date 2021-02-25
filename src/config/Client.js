export class ClientConfig {

  #sellerId = null;
  #clientId = null;
  #secret = null;
  #env = 'production';

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

  get env() {
    return this.#env;
  }

  set env(value) {
    this.#env = value;
  }

  get basicAuthtoken() {
    const clientSecret = `${this.#clientId}:${this.#secret}`;
    const buffer = new Buffer.from(clientSecret);

    return buffer.toString("base64");
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
