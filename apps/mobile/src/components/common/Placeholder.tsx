import React from 'react';
import { Text, View } from 'react-native';
import { Screen } from './Screen';

export function Placeholder({ title }: { title: string }) {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center py-24">
        <Text className="text-base font-semibold text-gray-900">{title}</Text>
      </View>
    </Screen>
  );
}

