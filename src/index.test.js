import getnet from './index';

describe('GetNet', () => {

  describe('.config', () => {
    const sellerId = 'sellerExample';
    const clientId = 'clientExample';
    const secret = 'clientSecretExample';

    test('configures the sellerId, clientId and the secret', () => {
      getnet.config(sellerId, clientId, secret);

      expect(getnet.client.sellerId).toEqual(sellerId);
      expect(getnet.client.clientId).toEqual(clientId);
      expect(getnet.client.secret).toEqual(secret);
    });
  });

  describe('.useEnv', () => {
    test('defines the getnet api`s environment', () => {
      expect(getnet.client.env).toEqual('production');
      getnet.useEnv('sandbox');
      expect(getnet.client.env).toEqual('sandbox');
    });
  });

});
