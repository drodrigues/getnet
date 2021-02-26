import { Safebox } from './index';

import {
  setupClient,
  mockRequest,
} from './test/Helpers';

describe('Safebox', () => {

  beforeAll(setupClient);

  describe('.add', () => {
    describe('when the params are invalid', () => {
      test('return the bad request', async () => {
        mockRequest('onPost', '/v1/cards', 400, 'SandboxAdd400Request.json', {});

        try {
          await Safebox.add({});
        } catch(ex) {
          expect(ex.httpStatus).toEqual(400);
          expect(ex.message).toEqual('"number_token" is required');
        }
      });
    });

    describe('when the params are valid', () => {
      const params = {
        numberToken: "dfe05208b105578c070f806c80abd3af09e246827d29b866cf4ce16c205849977c9496cbf0d0234f42339937f327747075f68763537b90b31389e01231d4d13c",
        brand: "Mastercard",
        cardholderName: "JOAO DA SILVA",
        expirationMonth: "12",
        expirationYear: "20",
        customerId: "customer_21081826",
        cardholderIdentification: "12345678912",
        verifyCard: false,
        securityCode: "123"
      };

      test('return the card`s safe data', async () => {
        mockRequest('onPost', '/v1/cards', 200, 'SandboxAdd200Request.json', params);
        const { cardId, numberToken } = await Safebox.add(params);

        expect(cardId).toEqual('e8ad2ae4-9e3e-4532-998f-1a5a11e56e58');
        expect(numberToken).toEqual(params.numberToken);
      });
    });
  });

});
