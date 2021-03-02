import { Payment } from './index';

import {
  setupClient,
  mockRequest,
} from './test/Helpers';

describe('Payment', () => {

  beforeAll(setupClient);

  describe('.onCredit', () => {
    describe('when the params are invalid', () => {
      test('return the bad request', async () => {
        mockRequest('onPost', '/v1/payments/credit', 400, 'TokenCard400Request.json', {});

        try {
          await Payment.onCredit({});
        } catch(ex) {
          expect(ex.httpStatus).toEqual(400);
          expect(ex.message).toEqual('"card_number" is required');
        }
      });
    });

    describe('when the params are valid', () => {
      const params = {
        sellerId: "6eb2412c-165a-41cd-b1d9-76c575d70a28",
        amount: 100,
        currency: "BRL",
        order: {
          orderId: "6d2e4380-d8a3-4ccb-9138-c289182818a3",
          salesTax: 0,
          productType: "service"
        },
        customer: {
          customerId: "customer_21081826",
          firstName: "João",
          lastName: "da Silva",
          name: "João da Silva",
          email: "customer@email.com.br",
          documentType: "CPF",
          documentNumber: "12345678912",
          phoneNumber: "5551999887766",
          billingAddress: {
            street: "Av. Brasil",
            number: "1000",
            complement: "Sala 1",
            district: "São Geraldo",
            city: "Porto Alegre",
            state: "RS",
            country: "Brasil",
            postalCode: "90230060"
          }
        },
        device: {
          ipAddress: "127.0.0.1",
          deviceId: "hash-device-id"
        },
        shippings: [
          {
            firstName: "João",
            name: "João da Silva",
            email: "customer@email.com.br",
            phoneNumber: "5551999887766",
            shippingAmount: 3000,
            address: {
              street: "Av. Brasil",
              number: "1000",
              complement: "Sala 1",
              district: "São Geraldo",
              city: "Porto Alegre",
              state: "RS",
              country: "Brasil",
              postal_code: "90230060"
            }
          }
        ],
        subMerchant: {
          identificationCode: "9058344",
          documentType: "CNPJ",
          documentNumber: "20551625000159",
          address: "Torre Negra 44",
          city: "Cidade",
          state: "RS",
          postalCode: "90520000"
        },
        credit: {
          delayed: false,
          preAuthorization: false,
          saveCardData: false,
          transactionType: "FULL",
          numberInstallments: 1,
          softDescriptor: "LOJA*TESTE*COMPRA-123",
          dynamicMcc: 1799,
          card: {
            numberToken: "dfe05208b105578c070f806c80abd3af09e246827d29b866cf4ce16c205849977c9496cbf0d0234f42339937f327747075f68763537b90b31389e01231d4d13c",
            cardholderName: "JOAO DA SILVA",
            securityCode: "123",
            brand: "Mastercard",
            expirationMonth: "12",
            expirationYear: "20"
          }
        }
      };

      describe('and the payment was denied', () => {
        test('raise the payment denied error', async () => {
          mockRequest('onPost', '/v1/payments/credit', 402, 'PaymentDenied.json', params);

          try {
            await Payment.onCredit(params);
          } catch(ex) {
            expect(ex.httpStatus).toEqual(402);
            expect(ex.message).toEqual('"payment" was denied');
          }
        });
      });

      describe('and the payment was approved', () => {
        test('return the payment info', async () => {
          mockRequest('onPost', '/v1/payments/credit', 200, 'PaymentApproved.json', params);
          const {
            paymentId,
            sellerId,
            amount,
            currency,
            orderId,
            status,
            receivedAt,
            credit,
          } = await Payment.onCredit(params);

          expect(paymentId).toEqual('06f256c8-1bbf-42bf-93b4-ce2041bfb87e');
          expect(sellerId).toEqual('6eb2412c-165a-41cd-b1d9-76c575d70a28');
          expect(amount).toEqual(100);
          expect(currency).toEqual('BRL');
          expect(orderId).toEqual('6d2e4380-d8a3-4ccb-9138-c289182818a3');
          expect(status).toEqual('APPROVED');
          expect(receivedAt).toEqual('2017-03-19T16:30:30.764Z');
          expect(credit.delayed).toEqual(false);
          expect(credit.authorizationCode).toEqual('000000099999');
          expect(credit.authorizedAt).toEqual('2017-03-19T16:30:30Z');
          expect(credit.reasonCode).toEqual(0);
          expect(credit.reasonMessage).toEqual('transaction approved');
          expect(credit.acquirer).toEqual('GETNET');
          expect(credit.softDescriptor).toEqual('Descrição para fatura');
          expect(credit.brand).toEqual('Mastercard');
          expect(credit.terminalNsu).toEqual('0099999');
          expect(credit.acquirerTransactionId).toEqual('10000024');
          expect(credit.transactionId).toEqual('1002217281190421');
        });
      });
    });
  });

});
