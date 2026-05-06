import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.ORDER_SUCCESS>;

export function OrderSuccessScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = 0;
    t.value = withDelay(50, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));
  }, [t]);

  const ringStyle = useAnimatedStyle(() => {
    const s = interpolate(t.value, [0, 1], [0.6, 1]);
    const o = interpolate(t.value, [0, 1], [0, 1]);
    return { transform: [{ scale: s }], opacity: o };
  });

  const tickStyle = useAnimatedStyle(() => {
    const s = interpolate(t.value, [0, 1], [0.4, 1]);
    const r = interpolate(t.value, [0, 1], [-12, 0]);
    const o = interpolate(t.value, [0, 1], [0, 1]);
    return { transform: [{ scale: s }, { rotate: `${r}deg` }], opacity: o };
  });

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Animated.View
        style={ringStyle}
        className="h-28 w-28 items-center justify-center rounded-full bg-green-50"
      >
        <Animated.View style={tickStyle} className="h-20 w-20 items-center justify-center rounded-full bg-green-600">
          <Ionicons name="checkmark" size={44} color="#fff" />
        </Animated.View>
      </Animated.View>

      <Text className="mt-6 text-2xl font-extrabold text-gray-900">Order placed!</Text>
      <Text className="mt-2 text-sm font-semibold text-gray-600">
        Your order ID is <Text className="text-gray-900">{orderId}</Text>
      </Text>
      <Text className="mt-2 text-sm text-gray-600">Delivery timeline will appear in Orders.</Text>

      <Pressable
        onPress={() => navigation.replace(ROUTES.ORDER_DETAILS, { orderId })}
        className="mt-8 w-full rounded-2xl bg-gray-900 py-4"
      >
        <Text className="text-center text-base font-extrabold text-white">View Order</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.replace(ROUTES.TABS, { screen: ROUTES.TAB_HOME })}
        className="mt-3 w-full rounded-2xl bg-[#1F6FEB] py-4"
      >
        <Text className="text-center text-base font-extrabold text-white">Continue Shopping</Text>
      </Pressable>
    </View>
  );
}

