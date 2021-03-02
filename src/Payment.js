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

  static async cancelCredit(paymentId) {
    try {
      const { data } = await request.post(`/v1/payments/credit/${paymentId}/cancel`);
      return data.status.toLowerCase() == 'canceled';
    } catch (ex) {
      throw handleError(ex);
    }
  }

  static async cancelRequestOnCredit(paymentId, cancelAmount, cancelCustomKey) {
    try {
      const params = {
        paymentId,
        cancelAmount,
        cancelCustomKey,
      }

      const { data } = await request.post('/v1/payments/cancel/request', params);
      return data.status.toLowerCase() == 'accepted';
    } catch (ex) {
      throw handleError(ex);
    }
  }

}
