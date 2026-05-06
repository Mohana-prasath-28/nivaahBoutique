import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import type { Category } from '../../types/models';
import { PressScale } from '../common/PressScale';

export const CategoryTile = memo(function CategoryTile({
  item,
  onPress,
}: {
  item: Category;
  onPress?: () => void;
}) {
  return (
    <PressScale onPress={onPress} className="w-[23%] items-center">
      <View className="h-16 w-16 overflow-hidden rounded-2xl bg-white">
        <Image source={{ uri: item.imageUrl }} className="h-16 w-16" />
      </View>
      <Text numberOfLines={1} className="mt-2 text-xs font-semibold text-gray-800">
        {item.title}
      </Text>
    </PressScale>
  );
});

