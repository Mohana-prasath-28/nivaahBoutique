import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../routeStrings';
import type { AppStackParamList } from '../../types/navigation';

import { BottomTabsNavigator } from '../BottomTabs';
import { SearchScreen } from '../../screens/search/SearchScreen';
import { CategoryListingScreen } from '../../screens/category/CategoryListingScreen';
import { ProductListScreen } from '../../screens/category/ProductListScreen';
import { ProductDetailsScreen } from '../../screens/category/ProductDetailsScreen';
import { CheckoutScreen } from '../../screens/checkout/CheckoutScreen';
import { OrderSuccessScreen } from '../../screens/checkout/OrderSuccessScreen';
import { OrderDetailsScreen } from '../../screens/orders/OrderDetailsScreen';
import { AddReviewScreen } from '../../screens/orders/AddReviewScreen';
import { ReturnScreen } from '../../screens/orders/ReturnScreen';
import { MyProfileScreen } from '../../screens/profile/MyProfileScreen';
import { WishlistScreen } from '../../screens/profile/WishlistScreen';
import { AddressScreen } from '../../screens/profile/AddressScreen';
import { AddAddressScreen } from '../../screens/profile/AddAddressScreen';
import { WebViewScreen } from '../../screens/profile/WebViewScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTintColor: '#111827',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: '800' },
        headerStyle: { backgroundColor: '#FFFFFF' },
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name={ROUTES.TABS}
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.CATEGORY_LISTING}
        component={CategoryListingScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name={ROUTES.PRODUCT_LIST}
        component={ProductListScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductDetailsScreen} options={{ title: 'Saree' }} />
      <Stack.Screen name={ROUTES.CHECKOUT} component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen name={ROUTES.ORDER_SUCCESS} component={OrderSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.ORDER_DETAILS}
        component={OrderDetailsScreen}
        options={({ route }) => ({ title: route.params.orderId })}
      />
      <Stack.Screen name={ROUTES.ADD_REVIEW} component={AddReviewScreen} options={{ title: 'Review' }} />
      <Stack.Screen name={ROUTES.RETURN} component={ReturnScreen} options={{ title: 'Return & Refunds' }} />
      <Stack.Screen name={ROUTES.MY_PROFILE} component={MyProfileScreen} options={{ title: 'My Profile' }} />
      <Stack.Screen name={ROUTES.WISHLIST} component={WishlistScreen} options={{ title: 'Wishlist' }} />
      <Stack.Screen name={ROUTES.ADDRESS} component={AddressScreen} options={{ title: 'Address' }} />
      <Stack.Screen name={ROUTES.ADD_ADDRESS} component={AddAddressScreen} options={{ title: 'Add Address' }} />
      <Stack.Screen
        name={ROUTES.WEBVIEW}
        component={WebViewScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

