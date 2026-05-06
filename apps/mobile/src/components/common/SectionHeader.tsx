import React from 'react';
import { Pressable, Text, View } from 'react-native';

export function SectionHeader({
  title,
  actionText,
  onPressAction,
}: {
  title: string;
  actionText?: string;
  onPressAction?: () => void;
}) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-base font-extrabold text-gray-900">{title}</Text>
      {actionText && onPressAction ? (
        <Pressable onPress={onPressAction} hitSlop={12}>
          <Text className="text-sm font-bold text-[#1F6FEB]">{actionText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

