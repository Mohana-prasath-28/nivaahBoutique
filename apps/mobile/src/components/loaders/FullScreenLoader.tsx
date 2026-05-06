import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export function FullScreenLoader({ label }: { label?: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#1F6FEB" />
      {label ? (
        <Text className="mt-3 text-sm font-semibold text-gray-600">{label}</Text>
      ) : null}
    </View>
  );
}

