import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Screen } from '../../components/common/Screen';
import { useOrderStore } from '../../store/orderStore';
import { formatCurrencyINR } from '../../constants/formatters';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.ORDER_DETAILS>;

export function OrderDetailsScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const order = useOrderStore((s) => s.byId(orderId));

  if (!order) {
    return (
      <Screen className="flex-1 bg-white">
        <Text className="mt-10 text-center text-sm font-semibold text-gray-600">
          Order not found.
        </Text>
      </Screen>
    );
  }

  const delivered = order.status === 'Delivered';

  return (
    <Screen edges={[]} className="flex-1 bg-[#F6F7FB]" contentClassName="px-0 pb-0">

      <FlatList
        data={order.items}
        keyExtractor={(it) => it.product.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 140 }}
        ListHeaderComponent={
          <View>
            <View className="rounded-3xl bg-white p-4">
              <Text className="text-base font-extrabold text-gray-900">Delivery timeline</Text>
              <View className="mt-4">
                {order.deliveryTimeline.map((t, idx) => (
                  <View key={t.status} className="flex-row">
                    <View className="mr-3 items-center">
                      <View
                        className={[
                          'h-6 w-6 items-center justify-center rounded-full',
                          t.isDone ? 'bg-green-600' : 'bg-gray-200',
                        ].join(' ')}
                      >
                        {t.isDone ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
                      </View>
                      {idx < order.deliveryTimeline.length - 1 ? (
                        <View className={['mt-1 w-0.5 flex-1', t.isDone ? 'bg-green-200' : 'bg-gray-200'].join(' ')} />
                      ) : null}
                    </View>
                    <View className="pb-4">
                      <Text className="text-sm font-extrabold text-gray-900">{t.status}</Text>
                      <Text className="mt-1 text-xs font-semibold text-gray-500">{t.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View className="mt-3 rounded-3xl bg-white p-4">
              <Text className="text-base font-extrabold text-gray-900">Order items</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mt-3 rounded-3xl bg-white p-4">
            <Text numberOfLines={2} className="text-sm font-extrabold text-gray-900">
              {item.product.title}
            </Text>
            <Text className="mt-1 text-xs font-semibold text-gray-500">{item.product.brand}</Text>
            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-sm font-extrabold text-gray-900">
                {formatCurrencyINR(item.product.price)} × {item.qty}
              </Text>
              <Text className="text-sm font-extrabold text-gray-900">
                {formatCurrencyINR(item.product.price * item.qty)}
              </Text>
            </View>

            {delivered ? (
              <View className="mt-4 flex-row gap-3">
                <Pressable
                  onPress={() =>
                    navigation.navigate(ROUTES.ADD_REVIEW, { orderId: order.id, productId: item.product.id })
                  }
                  className="flex-1 rounded-2xl bg-[#1F6FEB] py-3"
                >
                  <Text className="text-center text-xs font-extrabold text-white">Add Rating & Review</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate(ROUTES.RETURN, { orderId: order.id, productId: item.product.id })
                  }
                  className="flex-1 rounded-2xl bg-gray-900 py-3"
                >
                  <Text className="text-center text-xs font-extrabold text-white">Return Product</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        )}
        ListFooterComponent={
          <View className="mt-3 rounded-3xl bg-white p-4">
            <Text className="text-base font-extrabold text-gray-900">Price</Text>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-600">Total paid</Text>
              <Text className="text-base font-extrabold text-gray-900">{formatCurrencyINR(order.total)}</Text>
            </View>
          </View>
        }
      />
    </Screen>
  );
}

