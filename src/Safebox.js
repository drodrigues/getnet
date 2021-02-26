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

}
