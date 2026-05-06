import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { useOrderStore } from '../../store/orderStore';
import { formatCurrencyINR } from '../../constants/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';

export function OrdersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const orders = useOrderStore((s) => s.orders);

  return (
    <Screen className="flex-1 bg-[#F6F7FB]" contentClassName="px-4 pb-8">
      <View className="mt-2">
        <Text className="text-base font-extrabold text-gray-900">Orders</Text>
        <Text className="mt-1 text-xs font-semibold text-gray-500">
          Track deliveries and view details
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        renderItem={({ item }) => {
          const delivered = item.status === 'Delivered';
          return (
            <Pressable
              onPress={() => navigation.navigate(ROUTES.ORDER_DETAILS, { orderId: item.id })}
              className="mb-3 rounded-3xl bg-white p-4"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-extrabold text-gray-900">{item.id}</Text>
                <View
                  className={[
                    'rounded-full px-3 py-1',
                    delivered ? 'bg-green-50' : 'bg-blue-50',
                  ].join(' ')}
                >
                  <Text
                    className={[
                      'text-[11px] font-extrabold',
                      delivered ? 'text-green-700' : 'text-[#1F6FEB]',
                    ].join(' ')}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text className="mt-2 text-sm font-semibold text-gray-700">
                Date: <Text className="text-gray-900">{item.createdAt}</Text>
              </Text>

              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-sm font-extrabold text-gray-900">
                  {formatCurrencyINR(item.total)}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-xs font-semibold text-gray-500">
                    {item.items.length} item(s)
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </View>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="mt-10 rounded-3xl bg-white p-6 items-center">
            <Ionicons name="cube-outline" size={30} color="#9CA3AF" />
            <Text className="mt-3 text-base font-extrabold text-gray-900">No orders yet</Text>
            <Text className="mt-1 text-sm text-gray-600">Place an order to see it here.</Text>
          </View>
        }
      />
    </Screen>
  );
}

