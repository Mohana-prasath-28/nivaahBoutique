import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import type { Category } from '../../types/models';
import { PressScale } from '../common/PressScale';

export const CategoryCardLarge = memo(function CategoryCardLarge({
  item,
  subtitle,
  onPress,
}: {
  item: Category;
  subtitle?: string;
  onPress?: () => void;
}) {
  return (
    <PressScale
      onPress={onPress}
      className="flex-1 overflow-hidden rounded-3xl border border-gray-100 bg-white"
    >
      <View className="relative">
        <Image source={{ uri: item.imageUrl }} className="h-28 w-full bg-gray-100" />
        <View className="absolute bottom-0 left-0 right-0 bg-black/35 px-4 py-3">
          <Text className="text-sm font-extrabold text-white">{item.title}</Text>
          {subtitle ? (
            <Text className="mt-0.5 text-[11px] font-semibold text-white/90">
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </PressScale>
  );
});

