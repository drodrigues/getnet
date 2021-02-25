import { Client } from './config';

const client = new Client().getInstance();

export const config = (sellerId, clientId, secret) => {
  client.sellerId = sellerId;
  client.clientId = clientId;
  client.secret = secret;
}

export const useEnv = env => client.env = env;

export default {
  config,
  client,
  useEnv,
};
