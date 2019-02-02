import realAxios from 'axios';

import mockAxios from 'vk-apps-frontend/helpers/axiosMock';
import { DEBUG } from 'vk-apps-frontend/constants';
import { API_URL, API_REQUEST_HEADERS } from 'vk-apps-frontend/constants/api';

const axios = DEBUG ? mockAxios : realAxios;

class ApiManager {
  constructor(vkExecutionParams, sign) {
    this.vkExecutionParams = vkExecutionParams;
    this.sign = sign;
  }

  static cancelRequests() {};

  static getInstance() {
    if (!ApiManager.instance) {
      let url = new URL(window.location.href);
      let sign = null;
      let vkExecutionParams = {};
      for (let param of url.searchParams) {
        if (param[0] === 'sign') {
          sign = param[1];
        } else if (param[0].startsWith('vk_')) {
          vkExecutionParams[param[0]] = param[1];
        }
      }
      ApiManager.instance = new ApiManager(vkExecutionParams, sign);
    }
    return ApiManager.instance;
  }

  async makeRequest(endpoint, method, options) {
    const url = `${API_URL}/${endpoint}`;
    const optionsWithSign = {
      ...options,
      ...this.vkExecutionParams,
      sign: this.sign,
    };

    if (method.toLowerCase() === 'get') {
      return axios({
        url: url,
        method: method,
        headers: API_REQUEST_HEADERS,
        params: optionsWithSign,
        cancelToken: new axios.CancelToken(cancelFunction => {
          ApiManager.cancelRequests = cancelFunction;
        })
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
      headers: API_REQUEST_HEADERS,
      data: optionsWithSign,
      cancelToken: new axios.CancelToken(cancelFunction => {
        ApiManager.cancelRequests = cancelFunction;
      })
    })
      .then(result => {
        if (result.status !== 200) {
          return null;
        }
        return result.data;
      });
  }
}

export default ApiManager;