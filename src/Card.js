import { request } from './config';

import {
  handleError,
} from './concerns/Exceptions';

export default class Card {

  static async asToken(params = {}) {
    try {
      const { data } = await request.post('/v1/tokens/card', params);
      return data.numberToken;
    } catch (ex) {
      throw handleError(ex);
    }
  }

  static async verification(params = {}) {
     try {
      const { data } = await request.post('/v1/cards/verification', params);
      return data;
    } catch (ex) {
      throw handleError(ex);
    }
  }

}
