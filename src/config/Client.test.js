import Client, { ClientConfig } from './Client';

describe('ClientConfig', () => {
  const client = new Client().getInstance();

  test('should be a ClientConfig`s sigleton class', () => {
    const client = new Client().getInstance();
    const client2 = new Client().getInstance();

    client.foo = 'bar';
    client2.foo = 'bar2';

    expect(client).toBeInstanceOf(ClientConfig);
    expect(client).toEqual(client2);
  });

  test('define #sellerId', () => {
    client.sellerId = 1234;

    expect(client.sellerId).toEqual(1234);
  });

  test('define #clientId', () => {
    client.clientId = 4321;

    expect(client.clientId).toEqual(4321);
  });

  test('define #secret', () => {
    client.secret = 'secret';

    expect(client.secret).toEqual('secret');
  });

  test('define #env', () => {
    expect(client.env).toEqual('production');

    client.env = 'sandbox';

    expect(client.env).toEqual('sandbox');
  });

});
