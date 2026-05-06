import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../routeStrings";
import type { TabsParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeScreen } from "../../screens/home/HomeScreen";
import { CategoryScreen } from "../../screens/category/CategoryScreen";
import { CartScreen } from "../../screens/cart/CartScreen";
import { OrdersScreen } from "../../screens/orders/OrdersScreen";
import { ProfileScreen } from "../../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator<TabsParamList>();

export function BottomTabsNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#1F6FEB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          height: 71 + Math.max(insets.bottom, 0),
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 17),
        },
        tabBarItemStyle: { paddingVertical: 2 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700", marginTop: 2 },
        tabBarIcon: ({ color, size }) => {
          const icon =
            route.name === ROUTES.TAB_HOME
              ? "home-outline"
              : route.name === ROUTES.TAB_CATEGORY
                ? "grid-outline"
                : route.name === ROUTES.TAB_CART
                  ? "cart-outline"
                  : route.name === ROUTES.TAB_ORDERS
                    ? "cube-outline"
                    : "person-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.TAB_HOME}
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name={ROUTES.TAB_CATEGORY}
        component={CategoryScreen}
        options={{ title: "Category" }}
      />
      <Tab.Screen
        name={ROUTES.TAB_CART}
        component={CartScreen}
        options={{ title: "Cart" }}
      />
      <Tab.Screen
        name={ROUTES.TAB_ORDERS}
        component={OrdersScreen}
        options={{ title: "Orders" }}
      />
      <Tab.Screen
        name={ROUTES.TAB_PROFILE}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
