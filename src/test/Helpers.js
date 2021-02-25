import { Client } from './../config';

export const setupClient = () => {
  const client = new Client().getInstance();

  client.sellerId = process.env.SELLER_ID;
  client.clientId = process.env.CLIENT_ID;
  client.secret = process.env.CLIENT_SECRET;
  client.env = 'sandbox';
}
