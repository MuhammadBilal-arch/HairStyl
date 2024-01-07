export const END_POINTS = {
  AUTH: {
    LOGIN: 'login',
    FORGOT: 'forgot',
    LOGOUT: 'logout',
  },
  DASHBOARD: {
    ADD: 'dashboard',
    GET: 'dashboard',
    CHARTS: 'getEarnings'
  },

  ADMINS: {
    GET_ALL: 'getAdmins',
    ADD: 'createNewUser',
    DELETE: 'delUser',
    UPDATE: 'updateUser',
  },
  USERS: {
    GET_ALL: 'users',
  },
  VENDORS: {
    GET_ALL: 'vendors',
    TOP_RATED: 'topRated',
    TOP_SELLING: 'topSellings',
  },
  SERVICES: {
    GET_ALL: 'getServicesAdmin',
  },
  CATEGORIES: {
    ADD: 'createCategory',
    GET_ALL: 'getCategories',
    DELETE: 'deleteCategory',
    UPDATE: 'updateCategory',
  },
  PRODUCTS: {
    GET_ALL: 'getProducts',
    DELETE: 'deleteCategory',
  },

  ACCOUNTS: {
    UPDATE: 'status',
  },
};
