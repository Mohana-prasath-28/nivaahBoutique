import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { urls } from '../../constants/urls';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const items: Array<{
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }> = [
    { title: 'My Profile', icon: 'person-outline', onPress: () => navigation.navigate(ROUTES.MY_PROFILE) },
    { title: 'Wishlist', icon: 'heart-outline', onPress: () => navigation.navigate(ROUTES.WISHLIST) },
    { title: 'Address', icon: 'location-outline', onPress: () => navigation.navigate(ROUTES.ADDRESS) },
    { title: 'Returns & Refunds', icon: 'refresh-outline', onPress: () => navigation.navigate(ROUTES.RETURN, { orderId: 'ORD-245881', productId: 'p1' }) },
    { title: 'Terms & Conditions', icon: 'document-text-outline', onPress: () => navigation.navigate(ROUTES.WEBVIEW, { title: 'Terms & Conditions', url: urls.terms }) },
    { title: 'Privacy Policy', icon: 'shield-checkmark-outline', onPress: () => navigation.navigate(ROUTES.WEBVIEW, { title: 'Privacy Policy', url: urls.privacy }) },
  ];

  return (
    <Screen scroll contentClassName="px-4 pb-8">
      <View className="mt-4 rounded-3xl bg-white p-5">
        <Text className="text-base font-extrabold text-gray-900">{user?.name ?? 'Guest'}</Text>
        <Text className="mt-1 text-sm font-semibold text-gray-600">{user?.phone ?? '+91'}</Text>
        {user?.email ? (
          <Text className="mt-1 text-sm text-gray-600">{user.email}</Text>
        ) : null}
      </View>

      <View className="mt-4 rounded-3xl bg-white p-2">
        {items.map((it, idx) => (
          <Pressable
            key={it.title}
            onPress={it.onPress}
            className={[
              'flex-row items-center rounded-2xl px-4 py-4',
              idx !== items.length - 1 ? 'border-b border-gray-100' : '',
            ].join(' ')}
          >
            <Ionicons name={it.icon} size={18} color="#111827" />
            <Text className="ml-3 flex-1 text-sm font-extrabold text-gray-900">{it.title}</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => logout()}
        className="mt-6 rounded-2xl bg-gray-900 py-4"
      >
        <Text className="text-center text-base font-extrabold text-white">Logout</Text>
      </Pressable>
    </Screen>
  );
}

