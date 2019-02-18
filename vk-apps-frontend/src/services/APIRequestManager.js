import axios from 'axios';

import { API_URL } from 'vk-apps-frontend/constants/api';

class APIRequestManager {
  constructor(vkExecutionParams, sign) {
    if (APIRequestManager.instance) {
      throw 'APIRequestManager instance already exists. Use getInstance() instead';
    }
    this.vkExecutionParams = vkExecutionParams;
    this.sign = sign;
    this.headers = {
      "Accept-Language": "ru-RU",
    };
  }

  static cancelRequests() {};

  static getInstance() {
    if (!APIRequestManager.instance) {
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
      APIRequestManager.instance = new APIRequestManager(vkExecutionParams, sign);
    }
    return APIRequestManager.instance;
  }

  makeRequest(endpoint, method, options, useFormData = false) {
    const url = `${API_URL}/${endpoint}`;
    let optionsWithSign = {
      ...options,
      ...this.vkExecutionParams,
      sign: this.sign,
    };
    if (useFormData) {
      let formData = new FormData();
      for (let key in optionsWithSign) {
        formData.append(key, optionsWithSign[key]);
      }
      optionsWithSign = formData;
    }

    const axiosRequestPromise = method.toLowerCase() === 'get' ?
      axios({
        url: url,
        method: method,
        headers: this.headers,
        params: optionsWithSign,
        cancelToken: new axios.CancelToken(cancelFunction => {
          APIRequestManager.cancelRequests = cancelFunction;
        })
      })
    : axios({
        url: url,
        method: method,
        headers: this.headers,
        data: optionsWithSign,
        cancelToken: new axios.CancelToken(cancelFunction => {
          APIRequestManager.cancelRequests = cancelFunction;
        })
      });

    return axiosRequestPromise
      .then(response => response)
      .catch(error => {
        if (error.response) {
          return error.response;
        }
        return error.message;
      });
  }
}

export default APIRequestManager;