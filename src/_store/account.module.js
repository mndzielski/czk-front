import { userService } from "../_services";
import { router } from "../_helpers";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit("loginRequest", { username });

    userService.login(username, password).then(
      user => {
        commit("loginSuccess", user);
        commit("navigationMenu/login", null, { root: true });
        router.push("/");
      },
      error => {
        commit("loginFailure", error);
        dispatch("snackbar/showErrorSnackbar", {text: 'Niepoprawny login lub hasło.'}, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
    commit("navigationMenu/logout", null, { root: true });
  }
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = null;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
