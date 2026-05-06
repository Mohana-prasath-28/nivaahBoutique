import React, { useMemo } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { useCartStore } from '../../store/cartStore';
import { formatCurrencyINR } from '../../constants/formatters';
import { QuantityStepper } from '../../components/product/QuantityStepper';
import { Ionicons } from '@expo/vector-icons';
import { SectionHeader } from '../../components/common/SectionHeader';
import { mockProducts } from '../../store/mockData';
import { ProductCard } from '../../components/cards/ProductCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientButton } from '../../components/common/GradientButton';

export function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();

  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const subtotal = useCartStore((s) => s.subtotal());

  const deliveryFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal + deliveryFee;
  const similar = useMemo(() => mockProducts.slice(10, 18), []);

  return (
    <Screen className="flex-1 bg-[#F6F7FB]" contentClassName="px-0 pb-0">
      <View className="bg-white px-4 pb-4 pt-2">
        <Text className="text-base font-extrabold text-gray-900">Cart</Text>
        <Text className="mt-1 text-xs font-semibold text-gray-500">
          {items.length} item(s) • Secure checkout
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.product.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View className="mb-3 overflow-hidden rounded-3xl border border-gray-100 bg-white">
            <View className="flex-row p-4">
              <Image
                source={{ uri: item.product.images[0] }}
                className="h-24 w-24 rounded-2xl bg-gray-100"
              />
              <View className="ml-4 flex-1">
                <Text numberOfLines={2} className="text-sm font-extrabold text-gray-900">
                  {item.product.title}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-gray-500">
                  {item.product.brand}
                </Text>

                <Text className="mt-2 text-base font-extrabold text-gray-900">
                  {formatCurrencyINR(item.product.price)}
                </Text>
                <Text className="mt-1 text-[11px] font-semibold text-green-700">
                  {item.product.deliveryText ?? 'Delivery by Tomorrow'}
                </Text>

                <View className="mt-3 flex-row items-center justify-between">
                  <QuantityStepper value={item.qty} onChange={(q) => setQty(item.product.id, q)} />
                  <Pressable
                    onPress={() => remove(item.product.id)}
                    className="flex-row items-center rounded-full bg-gray-100 px-3 py-2"
                  >
                    <Ionicons name="trash-outline" size={16} color="#111827" />
                    <Text className="ml-2 text-xs font-extrabold text-gray-900">Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="mt-10 items-center rounded-3xl bg-white p-6">
            <Ionicons name="cart-outline" size={30} color="#9CA3AF" />
            <Text className="mt-3 text-base font-extrabold text-gray-900">Your cart is empty</Text>
            <Text className="mt-1 text-sm text-gray-600">Add items to continue.</Text>
          </View>
        }
        ListFooterComponent={
          items.length ? (
            <View className="mt-4">
              <View className="rounded-3xl bg-white p-4">
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

              <View className="mt-6">
                <SectionHeader title="Similar products" />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={similar}
                  keyExtractor={(p) => p.id}
                  renderItem={({ item: p }) => (
                    <View className="mr-3">
                      <ProductCard
                        product={p}
                        onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: p.id })}
                        onAddToCart={() => useCartStore.getState().add(p)}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          ) : null
        }
      />

      {items.length ? (
        <View
          className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 pt-4"
          style={{ paddingBottom: Math.max(insets.bottom, 12) + 12 }}
        >
          <GradientButton
            title={`Checkout • ${formatCurrencyINR(total)}`}
            onPress={() => navigation.navigate(ROUTES.CHECKOUT)}
          />
        </View>
      ) : null}
    </Screen>
  );
}

