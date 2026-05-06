import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ROUTES } from '../navigation/routeStrings';

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.SIGNUP]: undefined;
  [ROUTES.OTP]: { phone: string };
  [ROUTES.RESET_PASSWORD]: { phone: string };
};

export type TabsParamList = {
  [ROUTES.TAB_HOME]: undefined;
  [ROUTES.TAB_CATEGORY]: undefined;
  [ROUTES.TAB_CART]: undefined;
  [ROUTES.TAB_ORDERS]: undefined;
  [ROUTES.TAB_PROFILE]: undefined;
};

export type AppStackParamList = {
  [ROUTES.TABS]: NavigatorScreenParams<TabsParamList>;
  [ROUTES.SEARCH]: undefined;
  [ROUTES.CATEGORY_LISTING]: { categoryId: string; title: string };
  [ROUTES.PRODUCT_LIST]: { categoryId: string; title: string };
  [ROUTES.PRODUCT_DETAILS]: { productId: string };
  [ROUTES.CHECKOUT]: undefined;
  [ROUTES.ORDER_SUCCESS]: { orderId: string };
  [ROUTES.ORDER_DETAILS]: { orderId: string };
  [ROUTES.ADD_REVIEW]: { orderId: string; productId: string };
  [ROUTES.RETURN]: { orderId: string; productId: string };
  [ROUTES.MY_PROFILE]: undefined;
  [ROUTES.WISHLIST]: undefined;
  [ROUTES.ADDRESS]: undefined;
  [ROUTES.ADD_ADDRESS]: undefined;
  [ROUTES.WEBVIEW]: { title: string; url: string };
};

