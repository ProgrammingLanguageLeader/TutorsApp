import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { API_URL } from "../constants";

const axiosInstance = axios.create();
let mockAdapter = new MockAdapter(axiosInstance);

mockAdapter.onGet(`${API_URL}/search_vacancies/`).reply(200, [
  {
    vacancy_id: 1,
    owner: {
      profile_id: 144736529,
      city: "Moscow"
    },
    price: 1000,
    subject: "Math",
  },
  {
    vacancy_id: 2,
    owner: {
      profile_id: 144736529,
      city: ""
    },
    price: 1000,
    subject: "Informatics",
  }
]);

mockAdapter.onGet(`${API_URL}/get_vacancy/`).reply(200, {
  vacancy_id: 1,
  owner: {
    profile_id: 144736529,
    city: "Moscow",
    education: "Plekhanov Russian University of Economics",
    creation_time: "2018-12-10T02:47:07.264481Z"
  },
  price: 1000,
  subject: "Math"
});

export default axiosInstance;
