const _paths = {
  home: {
    url: "/",
    title: "Centrum Zarządzania Kryzysowego",
    view: "HomeView",
    requireAuth: false
  },
  login: {
    url: "/login",
    title: "Centrum Zarządzania Kryzysowego",
    view: "auth/VcAuthLogin",
    requireAuth: false
  },
  public: {
    emergencyNumbers: {
      url: "/public/emergency-numbers",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/VcEmergencyNumbers",
      requireAuth: false
    },
    criticalInfrastructure: {
      url: "/public/critical-infrastructure",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/VcCriticalInfrastructure",
      requireAuth: false
    },
    guides: {
      url: "/public/guides",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/VcGuides",
      requireAuth: false
    }
  },
  actions: {
    announcements: {
      url: "/public/announcements",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/VcPublicAnnouncements",
      requireAuth: false
    },
    settings: {
      url: "/public/settings",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/VcSettings",
      requireAuth: false
    }
  },
  commonThreats: {
    trafficCollision: {
      url: "/common-threats/traffic-collision",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/common-threats/TrafficCollisionView",
      requireAuth: false
    },
    fire: {
      url: "/common-threats/fire", 
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/common-threats/FireView",
      requireAuth: false
    },
    flood: {
      url: "/common-threats/flood",
      title: "Centrum Zarządzania Kryzysowego",
      view: "public/common-threats/FloodView",
      requireAuth: false
    }
  },
  secure: {
    announcements: {
      url: "/secure/announcements",
      title: "Centrum Zarządzania Kryzysowego",
      view: "secure/VcSecureAnnouncements",
      requireAuth: true
    },
    categories: {
      url: "/secure/categories",
      title: "Centrum Zarządzania Kryzysowego",
      view: "secure/VcCategories",
      requireAuth: true
    },
  },
  errors: {
    page404: {
      url: "/404",
      title: "Centrum Zarządzania Kryzysowego",
      view: "errors/404View",
      requireAuth: false
    } 
  }
};

export const paths = [
  _paths.home,
  _paths.login,
  _paths.public.emergencyNumbers,
  _paths.public.criticalInfrastructure,
  _paths.public.guides,

  _paths.actions.announcements,
  _paths.actions.settings,

  _paths.commonThreats.trafficCollision,
  _paths.commonThreats.fire,
  _paths.commonThreats.flood,

  _paths.secure.announcements,
  _paths.secure.categories,

  _paths.errors.page404,
];

export default _paths;
