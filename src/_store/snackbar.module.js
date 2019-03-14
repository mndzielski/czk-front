const state = {
  active: false,
  color: "",
  timeout: 0,
  text: ""
};
const actions = {
    showMessage: function (context, snackbar) {
        if (!context.state.active) {
            context.commit('showMessage', snackbar);
            return;
        }

        context.state.active = false;
        setTimeout(function () {
            context.commit('showMessage', snackbar);
        }, 250);
    },
    showSuccessSnackbar: function (context, snackbar) {
        context.dispatch('showMessage', {
            color: 'success',
            text: snackbar.text,
            timeout: 2000
        });
    },
    showErrorSnackbar: function (context, snackbar) {
        context.dispatch('showMessage', {
            color: 'error',
            text: snackbar.text,
            timeout: 6000
        });
    }
};

const mutations = {
    showMessage: function (state, snackbar) {
        state.text = snackbar.text;
        state.timeout = snackbar.timeout;
        state.color = snackbar.color;
        state.active = true;
    }
};

export const snackbar = {
  namespaced: true,
  state,
  actions,
  mutations
};
