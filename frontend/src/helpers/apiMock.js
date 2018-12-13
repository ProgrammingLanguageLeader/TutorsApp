import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { API_URL } from "../constants";

const axiosInstance = axios.create();
let mockAdapter = new MockAdapter(axiosInstance);

mockAdapter.onGet(`${API_URL}/search_vacancies/`).reply(200, [
  {
    vacancy_id: 1,
    owner: {
      "profile_id": 144736529,
      "creation_time": "2018-12-10T18:54:53.645340Z",
      "is_active": true,
      "experience": "2 years",
      "education": "Plekhanov Russian University of Economics",
      "city": "Moscow",
      "district": "Zamoskvorechye",
      "street": "Stremyannyy Pereulok",
      "metro_station": "Serpukhovskaya",
      "description": "Really good tutor"
    },
    price: 1000,
    subject: "Math",
  },
  {
    vacancy_id: 2,
    owner: {
      "profile_id": 144736529,
      "creation_time": "2018-12-10T18:54:53.645340Z",
      "is_active": true,
      "experience": "2 years",
      "education": "Plekhanov Russian University of Economics",
      "city": "Moscow",
      "district": "Zamoskvorechye",
      "street": "Stremyannyy Pereulok",
      "metro_station": "Serpukhovskaya",
      "description": "Really good tutor"
    },
    price: 1000,
    subject: "Informatics",
  }
]);

mockAdapter.onGet(`${API_URL}/get_vacancy/`).reply(200, {
  vacancy_id: 1,
  owner: {
    "profile_id": 144736529,
    "creation_time": "2018-12-10T18:54:53.645340Z",
    "is_active": true,
    "experience": "2 years",
    "education": "Plekhanov Russian University of Economics",
    "city": "Moscow",
    "district": "Zamoskvorechye",
    "street": "Stremyannyy Pereulok",
    "metro_station": "Serpukhovskaya",
    "description": "Really good tutor"
  },
  price: 1000,
  subject: "Math"
});

mockAdapter.onGet(`${API_URL}/get_lessons/`).reply(200, [
  {
    "lesson_id": 1,
    "creation_time": "2018-12-10T18:53:32.393469Z",
    "modification_time": "2018-12-10T18:53:32.393492Z",
    "beginning_time": "2018-12-10T15:00:00.000000Z",
    "ending_time": "2018-12-10T16:00:00.000000Z",
    "price": 800,
    "tutor": {
      "profile_id": 1,
      "creation_time": "2018-12-10T18:54:53.645340Z",
      "is_active": true,
      "experience": null,
      "education": null,
      "city": null,
      "district": null,
      "street": null,
      "metro_station": null,
      "description": null
    },
    "student": {
      "profile_id": 144736529,
      "creation_time": "2018-12-10T18:54:53.645340Z",
      "is_active": true,
      "experience": "2 years",
      "education": "Plekhanov Russian University of Economics",
      "city": "Moscow",
      "district": "Zamoskvorechye",
      "street": "Stremyannyy Pereulok",
      "metro_station": "Serpukhovskaya",
      "description": "Really good tutor"
    }
  },
  {
    "lesson_id": 2,
    "creation_time": "2018-12-10T18:53:32.393469Z",
    "modification_time": "2018-12-10T18:53:32.393492Z",
    "beginning_time": "2018-12-10T16:00:00.000000Z",
    "ending_time": "2018-12-10T17:00:00.000000Z",
    "price": 1000,
    "tutor": {
      "profile_id": 1,
      "creation_time": "2018-12-10T18:54:53.645340Z",
      "is_active": true,
      "experience": null,
      "education": null,
      "city": null,
      "district": null,
      "street": null,
      "metro_station": null,
      "description": null
    },
    "student": {
      "profile_id": 144736529,
      "creation_time": "2018-12-10T18:54:53.645340Z",
      "is_active": true,
      "experience": "2 years",
      "education": "Plekhanov Russian University of Economics",
      "city": "Moscow",
      "district": "Zamoskvorechye",
      "street": "Stremyannyy Pereulok",
      "metro_station": "Serpukhovskaya",
      "description": "Really good tutor"
    }
  }
]);

mockAdapter.onGet(`${API_URL}/get_profile/`).reply(200, {
  "profile_id": 144736529,
  "creation_time": "2018-12-10T18:54:53.645340Z",
  "is_active": true,
  "experience": "2 years",
  "education": "Plekhanov Russian University of Economics",
  "city": "Moscow",
  "district": "Zamoskvorechye",
  "street": "Stremyannyy Pereulok",
  "metro_station": "Serpukhovskaya",
  "description": "Really good tutor"
});

mockAdapter.onPost(`${API_URL}/update_profile/`).reply(400, {});

export default axiosInstance;
