export const END_POINTS = {
  AUTH: {
    LOGIN: '/account/login',
    REGISTER: '/account/register',
    FORGOT_PASSWORD: '/account/forgot-password',
    RESET_PASSWORD: '/account/reset-password',
    SEND_OTP: '/account/send-otp',
    VERIFY_OTP: '/account/verify-otp',
    UPLOAD: '/account/upload/license',
    UPDATE: '/account/update',
    GOOGLE_AUTH: '/account/google/userinfo',
  },
  DISPENSARIES: {
    ADD: '/dispensary/add',
    GET_ALL: '/dispensary/',
    GET_NEAREST: '/dispensary/nearest',
    DELETE: '/dispensary/delete',
    UPDATE: '/dispensary/update',
  },
  CATEGORIES: {
    ADD: '/category/add',
    GET_ALL: '/category',
    DELETE: '/category/delete',
    UPDATE: '/category/update',
  },
  PRODUCTS: {
    ADD: '/product/add',
    GET_BY_ID: '/product/getbyid',
    DELETE: '/product/delete',
    UPDATE: '/product/update',
  },
  CHAT: {
    ADD: '/chat/create',
    GET: '/chat/id',
    DELETE: '/chat/delete',
    UPDATE: '/chat/update',
  },
  LOCATION: {
    ADD: '/location/create',
    GET: '/location/',
    DELETE: '/location/delete',
    UPDATE: '/location/update',
    UPDATE_STATUS: '/location/status',
  },
  ORDER: {
    GET_ID: '/order/getbyid',
    ADD: '/order/create',
    GET: '/order/',
    DELETE: '/order/delete',
    UPDATE: '/order/update',
  },
  TRANSACTIONS: {
    GET: '/transaction/revenue',
    GET_ALL: '/transaction/',
  },
  ACCOUNTS: {
    GET: '/account/users',
    UPDATE: '/account/update',
  },
  TAX: {
    GET: '/tax/',
    UPDATE: '/tax/update',
  },
  NOTIFICATIONS: {
    GET: '/notification/',
  },
};
