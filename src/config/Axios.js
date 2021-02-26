import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import camelcaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
import qs from 'qs';

import getnetConfig from './Getnet';
import Client from './Client';

import {
  UnauthorizedError,
  InvalidRequest,
} from './../concerns/Exceptions';

const client = new Client().getInstance();

export const authInstance = axios.create({ adapter });
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
    config.data = snakeCaseKeys(config.data, {deep: true});

    if (config.headers['content-type'] == 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data);
    }
  }

  if (config.params) {
    config.params = snakeCaseKeys(config.params, {deep: true});
  }

  config.baseURL = getnetConfig[client.env].endpoint;

  return config;
}

const responseErrorInterceptor = error => {
  if (error.response) {
    error.response.data = camelcaseKeys(error.response.data, {deep: true});
  }

  return Promise.reject(error);
}

authInstance.interceptors.request.use(requestInterceptor);
authInstance.interceptors.response.use(responseCamelcaseInterceptor);

instance.interceptors.response.use(responseCamelcaseInterceptor, responseErrorInterceptor);
instance.interceptors.request.use(requestInterceptor);
instance.interceptors.request.use(async config => {
  const { sellerId } = client;
  const accessToken = await getAccessToken();

  config.headers['seller_id'] = sellerId;
  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
});


export default instance;
