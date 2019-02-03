import axios from 'axios';

import { API_URL } from 'vk-apps-frontend/constants/api';

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

  async makeRequest(endpoint, method, options, useFormData = false) {
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

    if (method.toLowerCase() === 'get') {
      return axios({
        url: url,
        method: method,
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