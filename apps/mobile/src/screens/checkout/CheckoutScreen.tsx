import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { useCartStore } from '../../store/cartStore';
import { formatCurrencyINR } from '../../constants/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useAddressStore } from '../../store/addressStore';
import { PressScale } from '../../components/common/PressScale';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.CHECKOUT>;

type Pay = 'UPI' | 'Card' | 'COD';

export function CheckoutScreen({ navigation }: Props) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);

  const address = useAddressStore((s) => s.defaultAddress());

  const deliveryFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const [pay, setPay] = useState<Pay>('UPI');

  const orderId = useMemo(() => `ORD-${Math.floor(200000 + Math.random() * 899999)}`, []);

  return (
    <Screen edges={[]} className="flex-1 bg-[#F6F7FB]" contentClassName="px-0 pb-0">

      <FlatList
        data={items}
        keyExtractor={(it) => it.product.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 160 }}
        ListHeaderComponent={
          <View>
            <View className="rounded-3xl bg-white p-4">
              <Text className="text-base font-extrabold text-gray-900">Delivery address</Text>
              {address ? (
                <View className="mt-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-extrabold text-gray-900">{address.name}</Text>
                    {address.isDefault ? (
                      <View className="rounded-full bg-blue-50 px-3 py-1">
                        <Text className="text-[11px] font-extrabold text-[#1F6FEB]">Default</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text className="mt-1 text-xs font-semibold text-gray-600">{address.phone}</Text>
                  <Text className="mt-2 text-sm text-gray-800">
                    {address.addressLine}, {address.city}, {address.state} - {address.pincode}
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate(ROUTES.ADDRESS)}
                    className="mt-3 self-start rounded-full bg-gray-900 px-4 py-2"
                  >
                    <Text className="text-xs font-extrabold text-white">Change</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => navigation.navigate(ROUTES.ADDRESS)}
                  className="mt-3 rounded-2xl border border-gray-200 bg-white px-4 py-4"
                >
                  <Text className="text-sm font-extrabold text-gray-900">Add an address</Text>
                </Pressable>
              )}
            </View>

            <View className="mt-3 rounded-3xl bg-white p-4">
              <Text className="text-base font-extrabold text-gray-900">Payment</Text>
              <View className="mt-3 gap-3">
                {(['UPI', 'Card', 'COD'] as const).map((p) => {
                  const active = p === pay;
                  return (
                    <Pressable
                      key={p}
                      onPress={() => setPay(p)}
                      className={[
                        'rounded-2xl border px-4 py-4',
                        active ? 'border-[#1F6FEB] bg-blue-50' : 'border-gray-200 bg-gray-50',
                      ].join(' ')}
                    >
                      <Text
                        className={[
                          'text-sm font-extrabold',
                          active ? 'text-[#1F6FEB]' : 'text-gray-900',
                        ].join(' ')}
                      >
                        {p === 'UPI' ? 'UPI (UI only)' : p === 'Card' ? 'Credit/Debit Card (UI only)' : 'Cash on Delivery'}
                      </Text>
                      <Text className="mt-1 text-xs font-semibold text-gray-600">
                        {p === 'UPI'
                          ? 'Pay using UPI apps'
                          : p === 'Card'
                            ? 'Add new card or saved cards later'
                            : 'Pay at delivery'}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View className="mt-3 rounded-3xl bg-white p-4">
              <Text className="text-base font-extrabold text-gray-900">Order items</Text>
              <Text className="mt-1 text-xs font-semibold text-gray-500">{items.length} item(s)</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mt-3 rounded-3xl bg-white p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text numberOfLines={2} className="text-sm font-extrabold text-gray-900">
                  {item.product.title}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-gray-500">{item.product.brand}</Text>
                <Text className="mt-2 text-sm font-extrabold text-gray-900">
                  {formatCurrencyINR(item.product.price)} × {item.qty}
                </Text>
                <Text className="mt-1 text-[11px] font-semibold text-green-700">
                  {item.product.deliveryText ?? 'Delivery by Tomorrow'}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-sm font-extrabold text-gray-900">
                  {formatCurrencyINR(item.product.price * item.qty)}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View className="mt-3 rounded-3xl bg-white p-4">
            <Text className="text-base font-extrabold text-gray-900">Price summary</Text>
            <View className="mt-3 gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-600">Subtotal</Text>
                <Text className="text-sm font-extrabold text-gray-900">
                  {formatCurrencyINR(subtotal)}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-600">Delivery</Text>
                <Text className="text-sm font-extrabold text-gray-900">
                  {deliveryFee === 0 ? 'FREE' : formatCurrencyINR(deliveryFee)}
                </Text>
              </View>
              <View className="mt-2 h-px bg-gray-100" />
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-extrabold text-gray-900">Total</Text>
                <Text className="text-base font-extrabold text-gray-900">
                  {formatCurrencyINR(total)}
                </Text>
              </View>
            </View>
          </View>
        }
      />

      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 pb-6 pt-4">
        <PressScale
          onPress={() => {
            // UI only: simulate order placed
            clear();
            navigation.replace(ROUTES.ORDER_SUCCESS, { orderId });
          }}
          className="rounded-2xl bg-gray-900 py-4"
        >
          <Text className="text-center text-base font-extrabold text-white">
            Place Order • {formatCurrencyINR(total)}
          </Text>
        </PressScale>
        <Text className="mt-2 text-center text-[11px] font-semibold text-gray-500">
          Payment method: {pay}
        </Text>
      </View>
    </Screen>
  );
}

