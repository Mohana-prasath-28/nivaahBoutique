export const ROUTES = {
  // Auth
  LOGIN: 'Auth/Login',
  SIGNUP: 'Auth/Signup',
  OTP: 'Auth/OTP',
  RESET_PASSWORD: 'Auth/ResetPassword',

  // Tabs
  TABS: 'App/Tabs',
  TAB_HOME: 'Tab/Home',
  TAB_CATEGORY: 'Tab/Category',
  TAB_CART: 'Tab/Cart',
  TAB_ORDERS: 'Tab/Orders',
  TAB_PROFILE: 'Tab/Profile',

  // App screens
  SEARCH: 'App/Search',
  CATEGORY_LISTING: 'App/CategoryListing',
  PRODUCT_LIST: 'App/ProductList',
  PRODUCT_DETAILS: 'App/ProductDetails',
  CHECKOUT: 'App/Checkout',
  ORDER_SUCCESS: 'App/OrderSuccess',
  ORDER_DETAILS: 'App/OrderDetails',
  ADD_REVIEW: 'App/AddReview',
  RETURN: 'App/Return',
  MY_PROFILE: 'App/MyProfile',
  WISHLIST: 'App/Wishlist',
  ADDRESS: 'App/Address',
  ADD_ADDRESS: 'App/AddAddress',
  WEBVIEW: 'App/WebView',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];

