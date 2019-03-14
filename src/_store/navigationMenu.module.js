import { router } from "../_helpers";
import paths from "../_helpers/paths";

const user = JSON.parse(localStorage.getItem("user"));

const publicMenu = [
  {
    action: "announcement",
    active: true,
    title: "Akcje",
    items: [
      { title: "Komunikaty", to: paths.actions.announcements.url },
      { title: "Ustawienia", to: paths.actions.settings.url }
    ]
  },
  {
    action: "list",
    active: true,
    title: "Informacje",
    items: [
      { title: "Numery alarmowe", to: paths.public.emergencyNumbers.url },
      {
        title: "Infrastruktura krytyczna",
        to: paths.public.criticalInfrastructure.url
      },
      {
        title: "Poradniki",
        to: paths.public.guides.url
      }
    ]
  }
];

const userMenu = [
  {
    action: "announcement",
    active: true,
    title: "Akcje",
    items: [
      { title: "Komunikaty", to: paths.secure.announcements.url },
      { title: "Kategorie", to: paths.secure.categories.url }
    ]
  }
];

const state = {
  menu: user ? userMenu : publicMenu
};

const actions = {};

const mutations = {
  login(state) {
    state.menu = userMenu;
  },
  logout(state) {
    state.menu = publicMenu;
  }
};

export const navigationMenu = {
  namespaced: true,
  state,
  actions,
  mutations
};
