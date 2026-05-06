import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Screen } from '../../components/common/Screen';
import { Text } from 'react-native';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.WEBVIEW>;

export function WebViewScreen({ route }: Props) {
  const { title, url } = route.params;
  return (
    <Screen className="flex-1 bg-white" contentClassName="px-0 pb-0">
      <View className="px-4 py-3">
        <Text className="text-base font-bold text-gray-900">{title}</Text>
        <Text className="mt-1 text-xs text-gray-500">{url}</Text>
      </View>
      <View className="flex-1">
        <WebView source={{ uri: url }} />
      </View>
    </Screen>
  );
}

