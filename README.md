# Getnet

A library/abstraction in Node.JS to implements the Getnet's services. 
https://developers.getnet.com.br/api

### Install

```sh
npm install getnet
```
or via YARN

```sh
yarn install getnet
```

### Usage
```js
import getnet, { Card, Safebox, Payment } from 'getnet';

//configure your credentials and define the getnet's env.
getnet.config(sellerId, clientId, secret);
getnet.useEnv('sandbox'); //sandbox, homolog or production

//Card token generation 
//(https://developers.getnet.com.br/api#tag/Tokenizacao)
const numberToken = await Card.asToken({
  cardNumber: '5155901222280001',
  customerId: 'customer_21081826',
});

//Card verification 
//(https://developers.getnet.com.br/api#tag/Pagamento%2Fpaths%2F~1v1~1cards~1verification%2Fpost)
const {
  status,
  verificationId,
  authorizationCode,
} = await Card.verification({
  numberToken: numberToken,
  expirationMonth: 12,
  expirationYear: 24,
  securityCode: 123,
});

//Add card on safebox
//https://developers.getnet.com.br/api#tag/Cofre%2Fpaths%2F~1v1~1cards%2Fpost
const { cardId, numberToken } = await Safebox.add({
  numberToken: numberToken,
  expirationMonth: 12,
  expirationYear: 24,
  customerId: 'customer_21081826',
  cardholderName: 'SR ABRAVANEL',
  verifyCard: false,
  securityCode: "123",
});

//Find card on safebox by Id
//https://developers.getnet.com.br/api#tag/Cofre%2Fpaths%2F~1v1~1cards~1%7Bcard_id%7D%2Fget
const {
  cardId,
  lastFourDigits,
  bin,
  expirationMonth,
  expirationYear,
  brand,
  cardholderName,
  customerId,
  numberToken,
  status,
} = await Safebox.findOne(cardId);

//Find the customer's cards on safebox
//https://developers.getnet.com.br/api#tag/Cofre%2Fpaths%2F~1v1~1cards%2Fget
const cards = await Safebox.findAllByCustomerId(customerId, status); //status: all, active, renewed. Default is all'

//Remove card from safebox
//https://developers.getnet.com.br/api#tag/Cofre%2Fpaths%2F~1v1~1cards~1%7Bcard_id%7D%2Fdelete
const wasRemoved = await Safebox.remove(cardId);

//Payment on credit
//https://developers.getnet.com.br/api#tag/Pagamento%2Fpaths%2F~1v1~1payments~1credit%2Fpost
const {
  paymentId,
  sellerId,
  amount,
  currency,
  orderId,
  status,
  receivedAt,
  credit,
} = await Payment.onCredit({
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
});


//Cancel payment on credit
//https://developers.getnet.com.br/api#tag/Pagamento%2Fpaths%2F~1v1~1payments~1credit~1%7Bpayment_id%7D~1cancel%2Fpost
const wasCanceled = await Payment.cancelCredit(paymentId);

//Request the payment's cancelation on credit
//https://developers.getnet.com.br/api#tag/Cancelamento%2Fpaths%2F~1v1~1payments~1cancel~1request%2Fpost
const wasCanceled = await Payment.cancelRequestOnCredit(paymentId, cancelAmount, cancelCustomKey);

```
