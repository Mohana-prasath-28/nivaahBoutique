import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const QuantityStepper = memo(function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View className="flex-row items-center rounded-full border border-gray-200 bg-white">
      <Pressable
        onPress={() => onChange(Math.max(1, value - 1))}
        className="h-9 w-9 items-center justify-center"
        hitSlop={10}
      >
        <Ionicons name="remove" size={16} color="#111827" />
      </Pressable>
      <Text className="min-w-[28px] text-center text-sm font-extrabold text-gray-900">
        {value}
      </Text>
      <Pressable
        onPress={() => onChange(value + 1)}
        className="h-9 w-9 items-center justify-center"
        hitSlop={10}
      >
        <Ionicons name="add" size={16} color="#111827" />
      </Pressable>
    </View>
  );
});

