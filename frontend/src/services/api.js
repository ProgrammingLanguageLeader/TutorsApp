import axios from 'axios';

export const API_URL = 'https://tutors-backend.herokuapp.com/api/v1';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const makeApiRequest = (endpoint, method, options) => {
  return axios({
    url: `${API_URL}/${endpoint}`,
    method: method,
    headers: HEADERS,
    data: options,
  })
  .then(res => res.data)
  .catch(res => res.data)
}