import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.CATEGORY_LISTING>;

const subCats = ['All', 'Top Deals', 'New', 'Premium', 'Budget', 'Best Sellers'];

export function CategoryListingScreen({ route, navigation }: Props) {
  const { title, categoryId } = route.params;

  return (
    <Screen scroll className="flex-1 bg-white" contentClassName="px-4 pb-8">
      <View className="mt-2 flex-row items-center">
        <Pressable onPress={() => navigation.goBack()} className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-base font-extrabold text-gray-900">{title}</Text>
          <Text className="text-xs font-semibold text-gray-500">{categoryId}</Text>
        </View>
      </View>

      <View className="mt-6 rounded-3xl bg-gray-50 p-4">
        <Text className="text-sm font-extrabold text-gray-900">Browse</Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {subCats.map((s) => (
            <Pressable
              key={s}
              className="rounded-full border border-gray-200 bg-white px-4 py-2"
              onPress={() => navigation.navigate(ROUTES.PRODUCT_LIST, { categoryId, title: `${title} • ${s}` })}
            >
              <Text className="text-xs font-bold text-gray-800">{s}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

