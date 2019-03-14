import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.module';
import { navigationMenu } from './navigationMenu.module';
import { snackbar } from './snackbar.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        account,
        navigationMenu,
        snackbar,
    }
});
