import { request } from './config';

import {
  handleError,
} from './concerns/Exceptions';

export default class Safebox {

  static async add(params) {
    try {
      const { data } = await request.post('/v1/cards', params);
      return data;
    } catch (ex) {
      throw handleError(ex);
    }
  }

  static async findAllByCustomerId(customerId, status = 'all') {
    try {
      const params = { customerId, status};
      const { data } = await request.get('/v1/cards', {params});
      return data.cards;
    } catch (ex) {
      throw handleError(ex);
    }
  }

  static async findOne(cardId) {
    try {
      const { data } = await request.get(`/v1/cards/${cardId}`);
      return data;
    } catch (ex) {
      throw handleError(ex);
    }
  }

}
