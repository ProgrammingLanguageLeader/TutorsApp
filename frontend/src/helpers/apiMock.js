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
      city: "Moscow"
    },
    price: 1000,
    subject: "Informatics",
  }
]);

export default axiosInstance;
