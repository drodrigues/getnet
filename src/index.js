import 'regenerator-runtime/runtime';

import { Client } from './config';

export { default as Card } from './Card';
export { default as Safebox } from './Safebox';

const client = new Client().getInstance();

const config = (sellerId, clientId, secret) => {
  client.sellerId = sellerId;
  client.clientId = clientId;
  client.secret = secret;
}

const useEnv = env => client.env = env;

export default {
  config,
  client,
  useEnv,
};
