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

  describe('.findAllByCustomerId', () => {
    describe('when params is invalid', () => {
      test('return the bad request', async () => {
        mockRequest('onGet', '/v1/cards', 400, 'SandboxFind400Request.json');

        try {
          await Safebox.findAllByCustomerId(null);
        } catch(ex) {
          expect(ex.httpStatus).toEqual(400);
          expect(ex.message).toEqual('"customer_id" is required');
        }
      });
    });

    describe('when params is valid', () => {
      const params = {
        customerId: 'customer_21081826',
        status: 'all',
      };

      describe('and the customerId was not found', () => {
        test('return the notFound', async () => {
          mockRequest('onGet', '/v1/cards', 404, 'SandboxFind404Request.json', {params});

          try {
            await Safebox.findAllByCustomerId(params.customerId);
          } catch(ex) {
            expect(ex.httpStatus).toEqual(404);
            expect(ex.message).toEqual('"customer_id" was not found');
          }
        });
      });

      describe('and the customerId was found', () => {
        test('return the cards', async () => {
          mockRequest('onGet', '/v1/cards', 200, 'SandboxFind200Request.json', {params});
          const cards = await Safebox.findAllByCustomerId(params.customerId);

          expect(cards.length).toEqual(1);
          expect(cards[0].cardId).toEqual('e8ad2ae4-9e3e-4532-998f-1a5a11e56e58');
          expect(cards[0].lastFourDigits).toEqual('1212');
          expect(cards[0].expirationMonth).toEqual('12');
          expect(cards[0].expirationYear).toEqual('20');
          expect(cards[0].brand).toEqual('Mastercard');
          expect(cards[0].cardholderName).toEqual('JOAO DA SILVA');
          expect(cards[0].customerId).toEqual(params.customerId);
          expect(cards[0].numberToken).toEqual('dfe05208b105578c070f806c80abd3af09e246827d29b866cf4ce16c205849977c9496cbf0d0234f42339937f327747075f68763537b90b31389e01231d4d13c');
          expect(cards[0].usedAt).toEqual('2017-04-19T16:30:30Z');
          expect(cards[0].createdAt).toEqual('2017-04-19T16:30:30Z');
          expect(cards[0].updatedAt).toEqual('2017-04-19T16:30:30Z');
          expect(cards[0].status).toEqual('active');
        });
      });
    });
  });

});
