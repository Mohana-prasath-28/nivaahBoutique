import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function EmptyState({
  title,
  description,
  icon = 'alert-circle-outline',
  actionText,
  onPressAction,
}: {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionText?: string;
  onPressAction?: () => void;
}) {
  return (
    <View className="items-center rounded-3xl bg-white p-6">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Ionicons name={icon} size={22} color="#6B7280" />
      </View>
      <Text className="mt-4 text-base font-extrabold text-gray-900">{title}</Text>
      {description ? (
        <Text className="mt-2 text-center text-sm text-gray-600">{description}</Text>
      ) : null}
      {actionText && onPressAction ? (
        <Pressable
          onPress={onPressAction}
          className="mt-5 rounded-full bg-[#1F6FEB] px-5 py-3"
        >
          <Text className="text-sm font-extrabold text-white">{actionText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

