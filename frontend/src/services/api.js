import axios from 'axios';

export const API_URL = 'http://localhost/api/v1';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

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
    .then(res => res.data)
  }
  return axios({
    url: url,
    method: method,
    headers: HEADERS,
    data: options,
  })
  .then(res => res.data)
}