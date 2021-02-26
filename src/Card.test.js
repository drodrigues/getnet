import { Card } from './index';

import {
  setupClient,
  mockRequest,
} from './test/Helpers';

describe('Card', () => {

  beforeAll(setupClient);

  describe('.asToken', () => {
    describe('when the params are invalid', () => {
      test('return the bad request', async () => {
        mockRequest('onPost', '/v1/tokens/card', 400, 'TokenCard400Request.json', {});

        try {
          await Card.asToken({});
        } catch(ex) {
          expect(ex.httpStatus).toEqual(400);
          expect(ex.message).toEqual('"card_number" is required');
        }
      });
    });

    describe('when the params are valid', () => {
      const params = { cardNumber: '5155901222280001', customerId: 'customer_21081826' };

      test('return the numbertoken', async () => {
        mockRequest('onPost', '/v1/tokens/card', 201, 'TokenCard200Request.json', params);
        const numberToken = await Card.asToken(params);

        expect(numberToken).toEqual('dfe05208b105578c070f806c80abd3af09e246827d29b866cf4ce16c205849977c9496cbf0d0234f42339937f327747075f68763537b90b31389e01231d4d13c');
      });
    });
  });

});
