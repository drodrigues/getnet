import { request } from './config';

import {
  handleError,
} from './concerns/Exceptions';

export default class Payment {

  static async onCredit(params) {
    try {
      const { data } = await request.post('/v1/payments/credit', params);
      return data;
    } catch (ex) {
      throw handleError(ex);
    }
  }

}
