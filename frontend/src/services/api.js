import realAxios from 'axios';
import mockAxios from '../helpers/apiMock';

import { API_URL, HEADERS } from "../constants";

const axios = process.env.REACT_APP_DEBUG ? mockAxios : realAxios;

export const makeApiRequest = async (endpoint, method, options) => {
  const url = `${API_URL}/${endpoint}/`;

  Object.keys(options).forEach((key) => (options[key] == null) && delete options[key]);

  if (method.toLowerCase() === 'get') {
    return axios({
      url: url,
      method: method,
      headers: HEADERS,
      params: options,
    })
      .then(result => {
        if (result.status !== 200) {
          return null;
        }
        return result.data;
      })
  }
  return axios({
    url: url,
    method: method,
    headers: HEADERS,
    data: options,
  })
    .then(result => {
      if (result.status !== 200) {
        return null;
      }
      return result.data;
    })
};
