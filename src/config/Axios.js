import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import camelcaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
import qs from 'qs';

import getnetConfig from './Getnet';
import Client from './Client';

const client = new Client().getInstance();

const authInstance = axios.create({ adapter });
const instance = axios.create({ adapter });

const getAccessToken = async () => {
  const params = {
    scope: 'oob',
    grantType: 'client_credentials',
  };

  const headers = {
    'Authorization': `Basic ${client.basicAuthtoken}`,
    'content-type': 'application/x-www-form-urlencoded',
  }

  try {
    const { data } = await authInstance.post('/auth/oauth/v2/token', params, {headers});

    return data.accessToken;
  } catch(ex) {
    return null;
  }
}

const responseCamelcaseInterceptor = response => {
  if (response.data) {
    response.data = camelcaseKeys(response.data, {deep: true});
  }

  return response;
}

const requestInterceptor = config => {
  if (config.data) {
    config.data = qs.stringify(snakeCaseKeys(config.data, {deep: true}));
  }

  config.baseURL = getnetConfig[client.env].endpoint;

  return config;
}

authInstance.interceptors.request.use(requestInterceptor);
authInstance.interceptors.response.use(responseCamelcaseInterceptor);

instance.interceptors.response.use(responseCamelcaseInterceptor);
instance.interceptors.request.use(requestInterceptor);
instance.interceptors.request.use(async config => {
  const { sellerId } = client;
  const accessToken = await getAccessToken();

  config.headers['seller_id'] = sellerId;
  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
});


export default instance;
