import config from "config";
import axios from "axios";

export const userService = {
  login,
  logout,
};

function login(username, password) {
  return axios
    .post(`${config.apiUrl}/login`, null, {
      params: { username, password }
    })
    .then(function(r) {
      let user = r.data;
      user.token = r.headers.authorization;
      localStorage.setItem("user", JSON.stringify(user));
    
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}