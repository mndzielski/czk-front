import config from "config";
import axios from "axios";

function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
}

function generateConfiguration(requireAuth, params) {
  return requireAuth
    ? {
        params,
        headers: authHeader()
      }
    : {
        params
      };
}

export const restapi = {
  get(url, requireAuth, params, success, error, final) {
    axios
      .get(`${config.apiUrl}${url}`, generateConfiguration(requireAuth, params))
      .then(response => {
        success(response);
      })
      .catch(e => {
        error(e);
      })
      .then(() => {
        final();
      });
  },
  post(url, requireAuth, data, params, success, error, final) {
    axios
      .post(`${config.apiUrl}${url}`, data, generateConfiguration(requireAuth, params))
      .then(response => {
        success(response);
      })
      .catch(e => {
        error(e);
      })
      .then(() => {
        final();
      });
  }
};
