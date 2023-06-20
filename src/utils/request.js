import axios from 'axios';

const requestAxios = axios.create({
  baseURL: 'http://localhost:8000/',
});

export default class AjaxQuery {
  static get(url, options = {}) {
    return requestAxios.get(url, { ...options });
  }

  static post(url, options = {}) {
    return requestAxios.post(url, { ...options });
  }

  static patch(url, options = {}) {
    return requestAxios.patch(url, { ...options });
  }

  static delete(url, options = {}) {
    return requestAxios.delete(url, { ...options });
  }
}
