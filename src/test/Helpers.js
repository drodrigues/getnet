import MockAdapter from 'axios-mock-adapter';
import path from 'path';
import snakeCaseKeys from 'snakecase-keys';
import fs from 'fs';

import {
  Client,
  request,
  requestAuth,
} from './../config';

export const setupClient = () => {
  const client = new Client().getInstance();

  client.sellerId = process.env.SELLER_ID;
  client.clientId = process.env.CLIENT_ID;
  client.secret = process.env.CLIENT_SECRET;
  client.env = 'homolog';
}

export const readFixture = filename => {
  const fixture = fs.readFileSync(path.join(__dirname, 'fixtures', filename), 'utf8');

  return fixture;
}

export const mockRequest = (method, url, status, fixture = null, data = null) => {
  const mockAuth = new MockAdapter(requestAuth);
  const authTokenRequest = readFixture('AuthTokenRequest.json');
  mockAuth.onPost('/auth/oauth/v2/token').reply(200, authTokenRequest);

  const mock = new MockAdapter(request);
  const fixtureBody = fixture ? readFixture(fixture) : null;

  if (data) {
    mock[method](url, snakeCaseKeys(data)).reply(status,fixtureBody )
  } else {
    mock[method](url).reply(status, fixtureBody)
  }
}
