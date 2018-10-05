import axios from 'axios';

export const API_URL = 'https://tutors-backend.herokuapp.com/api/v1';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const makeApiRequest = async (endpoint, method, options) => {
  const url = (method.toLowerCase() === 'post') ? `${API_URL}/${endpoint}/` : `${API_URL}/${endpoint}`;

  return axios({
    url: url,
    method: method,
    headers: HEADERS,
    data: options,
  })
  .then(res => res.data)
}