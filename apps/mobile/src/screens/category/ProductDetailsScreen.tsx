import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Ionicons } from '@expo/vector-icons';
import { ImageCarousel } from '../../components/product/ImageCarousel';
import { mockProducts } from '../../store/mockData';
import { formatCurrencyINR } from '../../constants/formatters';
import { DiscountBadge } from '../../components/common/DiscountBadge';
import { PressScale } from '../../components/common/PressScale';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { ProductCard } from '../../components/cards/ProductCard';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.PRODUCT_DETAILS>;

function discountPercent(mrp: number, price: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = useMemo(() => mockProducts.find((p) => p.id === productId) ?? mockProducts[0], [productId]);
  const discount = useMemo(() => discountPercent(product.mrp, product.price), [product.mrp, product.price]);

  const addToCart = useCartStore((s) => s.add);
  const has = useWishlistStore((s) => s.has(product.id));
  const toggle = useWishlistStore((s) => s.toggle);

  const similar = useMemo(() => mockProducts.filter((p) => p.id !== product.id).slice(0, 10), [product.id]);

  return (
    <View className="flex-1 bg-[#F6F7FB]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View className="relative">
          <ImageCarousel images={product.images} />
          {discount ? <DiscountBadge percent={discount} className="absolute left-4 top-4" /> : null}
        </View>

        <View className="mt-3 bg-white px-4 py-5">
          <Text className="text-sm font-extrabold text-gray-500">{product.brand}</Text>
          <Text className="mt-1 text-lg font-extrabold text-gray-900">{product.title}</Text>

          <View className="mt-3 flex-row items-end">
            <Text className="text-2xl font-extrabold text-gray-900">
              {formatCurrencyINR(product.price)}
            </Text>
            <Text className="ml-3 text-sm font-semibold text-gray-500 line-through">
              {formatCurrencyINR(product.mrp)}
            </Text>
            {discount ? (
              <Text className="ml-2 text-sm font-extrabold text-green-700">{discount}% off</Text>
            ) : null}
          </View>

          <View className="mt-3 flex-row items-center">
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text className="ml-1 text-sm font-extrabold text-gray-900">{product.rating.toFixed(1)}</Text>
            <Text className="ml-2 text-sm font-semibold text-gray-500">
              ({product.ratingCount} ratings)
            </Text>
          </View>

          <View className="mt-4 rounded-2xl bg-green-50 px-4 py-4">
            <Text className="text-sm font-extrabold text-green-800">
              {product.deliveryText ?? 'Delivery by Tomorrow'}
            </Text>
            <Text className="mt-1 text-xs font-semibold text-green-700">
              Free delivery on orders above ₹499 • Easy returns
            </Text>
          </View>
        </View>

        <View className="mt-3 bg-white px-4 py-5">
          <Text className="text-base font-extrabold text-gray-900">Offers</Text>
          <View className="mt-3 gap-3">
            {[
              'Bank Offer: 10% off on UPI',
              'Festival Deal: Extra ₹100 off',
              'No Cost EMI available (UI)',
            ].map((t) => (
              <View key={t} className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
                <Text className="text-sm font-semibold text-gray-900">{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-3 bg-white px-4 py-5">
          <Text className="text-base font-extrabold text-gray-900">Description</Text>
          <Text className="mt-2 text-sm leading-6 text-gray-700">
            Premium quality product with a modern look. Designed for everyday use with a durable build.
            UI-only description placeholder for backend integration later.
          </Text>
        </View>

        <View className="mt-3 bg-white px-4 py-5">
          <Text className="text-base font-extrabold text-gray-900">Specifications</Text>
          <View className="mt-3 gap-3">
            {[
              ['Brand', product.brand],
              ['Model', product.id.toUpperCase()],
              ['Warranty', '1 Year (UI)'],
              ['Country of Origin', 'India'],
            ].map(([k, v]) => (
              <View key={k} className="flex-row items-center justify-between rounded-2xl bg-gray-50 px-4 py-4">
                <Text className="text-sm font-semibold text-gray-600">{k}</Text>
                <Text className="text-sm font-extrabold text-gray-900">{v}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-3 bg-white px-4 py-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-extrabold text-gray-900">Ratings & Reviews</Text>
            <Text className="text-xs font-bold text-gray-500">VIEW ONLY</Text>
          </View>
          <View className="mt-3 rounded-2xl bg-gray-50 px-4 py-4">
            <Text className="text-sm font-semibold text-gray-900">Great product!</Text>
            <Text className="mt-1 text-xs text-gray-600">Verified purchase • 02/05/2026</Text>
            <Text className="mt-2 text-sm text-gray-700">
              Quality is good and delivery was fast. UI-only reviews section.
            </Text>
          </View>
        </View>

        <View className="mt-3 px-4">
          <Text className="mb-3 text-base font-extrabold text-gray-900">Similar products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {similar.map((p) => (
              <View key={p.id} className="mr-3">
                <ProductCard
                  product={p}
                  onPress={() => navigation.push(ROUTES.PRODUCT_DETAILS, { productId: p.id })}
                  onAddToCart={() => addToCart(p)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 pb-6 pt-4">
        <View className="flex-row gap-3">
          <PressScale
            onPress={() => addToCart(product)}
            className="flex-1 rounded-2xl bg-[#1F6FEB] py-4"
          >
            <Text className="text-center text-base font-extrabold text-white">Add to Cart</Text>
          </PressScale>
          <PressScale
            onPress={() => toggle(product.id)}
            className="flex-1 rounded-2xl bg-gray-900 py-4"
          >
            <Text className="text-center text-base font-extrabold text-white">
              {has ? 'Wishlisted' : 'Add to Wishlist'}
            </Text>
          </PressScale>
        </View>
      </View>
    </View>
  );
}

