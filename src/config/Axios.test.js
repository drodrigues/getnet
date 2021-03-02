import axios from './Axios';

import {
  setupClient,
} from './../test/Helpers';

describe('Axios', () => {

  beforeAll(setupClient);

  test('inject the accessToken and sellerId on requests', async () => {
    try {
      await axios.get('/error-404');
    } catch(ex) {
      expect(ex.response.config.headers.seller_id).toEqual(process.env.SELLER_ID);
      expect(ex.response.config.headers.Authorization).toMatch(/^Bearer [0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }
  });

});
