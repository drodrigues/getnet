import getnet, {
  Card,
  Safebox,
  Payment
} from './../index';

import {
  setupClient,
} from './Helpers';

import { Client } from './../config';

describe('Integration test', () => {

  const client = new Client().getInstance();
  const customerId = 'customer_21081826';
  const customerName = 'SR ABRAVANEL';

  let cardToken = null;
  let safeboxCardId = null;

  beforeAll(setupClient);
  afterAll(async () => {
    const cards = await Safebox.findAllByCustomerId(customerId);

    for (var i = 0, len = cards.length; i < len; i++) {
      await Safebox.remove(cards[i].cardId);
    }
  });

  test('Card.asToken', async () => {
    const params = {
      cardNumber: "5155901222280001",
      customerId,
    };

    cardToken = await Card.asToken(params);

    expect(cardToken.length).toEqual(128);
    expect(cardToken).toMatch(/(\d|\w){128}/);
  });

  test.skip('Card.verification', async () => {
    const params = {
      numberToken: cardToken,
      expirationMonth: 12,
      expirationYear: 24,
      securityCode: 123
    };
    const {
      status,
      verificationId,
      authorizationCode,
    } = await Card.verification(params);

    expect(status).toEqual('VERIFIED');
    expect(verificationId).toMatch(/(\d|\w|-){36}/);
    expect(authorizationCode).toBeGreaterThanOrEqual(1);
  });

  test('Safebox.add', async () => {
    const params = {
      numberToken: cardToken,
      expirationMonth: 12,
      expirationYear: 24,
      customerId,
      cardholderName: customerName,
      verifyCard: false,
      securityCode: "123"
    }
    const { cardId, numberToken } = await Safebox.add(params);

    safeboxCardId = cardId;

    expect(cardId).toMatch(/(\d|\w|-){36}/);
    expect(numberToken).toMatch(cardToken);
  });

  test('Safebox.findAllByCustomerId', async () => {
    const cards = await Safebox.findAllByCustomerId(customerId);

    expect(cards.length).toEqual(1);
    expect(cards[0].cardId).toEqual(safeboxCardId);
    expect(cards[0].lastFourDigits).toEqual('0001');
    expect(cards[0].bin).toEqual('515590');
    expect(cards[0].expirationMonth).toEqual(12);
    expect(cards[0].expirationYear).toEqual(24);
    expect(cards[0].brand).toEqual('mastercard');
    expect(cards[0].cardholderName).toEqual(customerName);
    expect(cards[0].customerId).toEqual(customerId);
    expect(cards[0].numberToken).toEqual(cardToken);
    expect(cards[0].status).toEqual('active');
  });

  test('Safebox.findOne', async () => {
    const card = await Safebox.findOne(safeboxCardId);

    expect(card.cardId).toEqual(safeboxCardId);
    expect(card.lastFourDigits).toEqual('0001');
    expect(card.bin).toEqual('515590');
    expect(card.expirationMonth).toEqual(12);
    expect(card.expirationYear).toEqual(24);
    expect(card.brand).toEqual('mastercard');
    expect(card.cardholderName).toEqual(customerName);
    expect(card.customerId).toEqual(customerId);
    expect(card.numberToken).toEqual(cardToken);
    expect(card.status).toEqual('active');
  });

  test('Payment.onCredit', async () => {
    const params = {
      sellerId: client.sellerId,
      amount: 100,
      currency: "BRL",
      order: {
        orderId: "1234",
        salesTax: 0,
        productType: "service"
      },
      customer: {
        customerId: "customer_21081826",
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
      credit: {
        delayed: false,
        preAuthorization: false,
        saveCardData: false,
        transactionType: "FULL",
        numberInstallments: 1,
        softDescriptor: "LOJA*TESTE*COMPRA-123",
        card: {
          numberToken: cardToken,
          expirationMonth: "12",
          expirationYear: "24",
        }
      }
    };

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

    expect(status).toEqual('APPROVED');
  });
});
