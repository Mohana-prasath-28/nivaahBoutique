import React, { memo, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import type { Product } from '../../types/models';
import { formatCurrencyINR } from '../../constants/formatters';
import { PressScale } from '../common/PressScale';
import { DiscountBadge } from '../common/DiscountBadge';
import { Ionicons } from '@expo/vector-icons';
import { useWishlistStore } from '../../store/wishlistStore';

function calcDiscountPercent(mrp: number, price: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export const ProductCard = memo(function ProductCard({
  product,
  onPress,
  onAddToCart,
}: {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
}) {
  const discount = useMemo(
    () => calcDiscountPercent(product.mrp, product.price),
    [product.mrp, product.price],
  );

  const has = useWishlistStore((s) => s.has(product.id));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <PressScale
      onPress={onPress}
      className="w-[160px] overflow-hidden rounded-3xl border border-gray-100 bg-white"
    >
      <View className="relative">
        <Image
          source={{ uri: product.images[0] }}
          className="h-40 w-full bg-gray-100"
          resizeMode="cover"
        />
        {discount ? <DiscountBadge percent={discount} className="absolute left-3 top-3" /> : null}
        <PressScale
          scaleTo={0.92}
          onPress={() => toggle(product.id)}
          className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-white/90"
        >
          <Ionicons
            name={has ? 'heart' : 'heart-outline'}
            size={18}
            color={has ? '#EF4444' : '#111827'}
          />
        </PressScale>
      </View>

      <View className="p-3">
        <Text className="text-xs font-bold text-gray-500">{product.brand}</Text>
        <Text numberOfLines={2} className="mt-1 text-sm font-semibold text-gray-900">
          {product.title}
        </Text>

        <View className="mt-2 flex-row items-center">
          <Text className="text-base font-extrabold text-gray-900">
            {formatCurrencyINR(product.price)}
          </Text>
          <Text className="ml-2 text-xs font-semibold text-gray-500 line-through">
            {formatCurrencyINR(product.mrp)}
          </Text>
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text className="ml-1 text-xs font-bold text-gray-700">
              {product.rating.toFixed(1)}
            </Text>
            <Text className="ml-1 text-xs text-gray-500">({product.ratingCount})</Text>
          </View>
          <PressScale
            scaleTo={0.95}
            onPress={onAddToCart}
            className="rounded-full bg-[#1F6FEB] px-3 py-1.5"
          >
            <Text className="text-[12px] font-extrabold text-white">Add</Text>
          </PressScale>
        </View>
      </View>
    </PressScale>
  );
});

