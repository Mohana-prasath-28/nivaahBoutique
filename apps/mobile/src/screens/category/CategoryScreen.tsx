import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { SectionHeader } from '../../components/common/SectionHeader';
import { mockCategories } from '../../store/mockData';
import { CategoryTile } from '../../components/cards/CategoryTile';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Ionicons } from '@expo/vector-icons';
import { CategoryCardLarge } from '../../components/cards/CategoryCardLarge';
import { EmptyState } from '../../components/common/EmptyState';

export function CategoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <Screen scroll contentClassName="px-4 pb-8">
      {/* Search */}
      <Pressable
        onPress={() => navigation.navigate(ROUTES.SEARCH)}
        className="mt-4 flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3"
      >
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <Text className="ml-2 flex-1 text-sm text-gray-500">
          Search categories & products
        </Text>
      </Pressable>

      {/* Promo / Festival banner */}
      <View className="mt-4 overflow-hidden rounded-3xl bg-[#111827] px-5 py-6">
        <Text className="text-xs font-extrabold text-white/80">FESTIVAL STORE</Text>
        <Text className="mt-1 text-2xl font-extrabold text-white">Mega Category Deals</Text>
        <Text className="mt-2 text-sm font-semibold text-white/80">
          Top picks across Fashion, Electronics & Home
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate(ROUTES.PRODUCT_LIST, { categoryId: 'festival', title: 'Festival Deals' })
          }
          className="mt-4 self-start rounded-full bg-[#FFB300] px-5 py-3"
        >
          <Text className="text-sm font-extrabold text-gray-900">Explore</Text>
        </Pressable>
      </View>

      {/* Top picks (large tiles) */}
      <View className="mt-6">
        <SectionHeader title="Top Picks" />
        <View className="flex-row gap-3">
          <CategoryCardLarge
            item={mockCategories[1]}
            subtitle="Under ₹999"
            onPress={() =>
              navigation.navigate(ROUTES.PRODUCT_LIST, { categoryId: mockCategories[1].id, title: mockCategories[1].title })
            }
          />
          <CategoryCardLarge
            item={mockCategories[4]}
            subtitle="Best sellers"
            onPress={() =>
              navigation.navigate(ROUTES.PRODUCT_LIST, { categoryId: mockCategories[4].id, title: mockCategories[4].title })
            }
          />
        </View>
      </View>

      {/* Dense category grid */}
      <View className="mt-6 rounded-3xl bg-white p-4">
        <SectionHeader title="All Categories" />
        {mockCategories.length ? (
          <FlatList
            data={mockCategories}
            numColumns={4}
            keyExtractor={(c) => c.id}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            renderItem={({ item }) => (
              <CategoryTile
                item={item}
                onPress={() =>
                  navigation.navigate(ROUTES.PRODUCT_LIST, {
                    categoryId: item.id,
                    title: item.title,
                  })
                }
              />
            )}
            scrollEnabled={false}
          />
        ) : (
          <View className="py-6">
            <EmptyState
              icon="grid-outline"
              title="No categories available"
              description="Please check back later."
              actionText="Go Home"
              onPressAction={() => navigation.navigate(ROUTES.TABS, { screen: ROUTES.TAB_HOME })}
            />
          </View>
        )}
      </View>

      {/* Quick links */}
      <View className="mt-6 flex-row gap-3">
        <Pressable
          onPress={() =>
            navigation.navigate(ROUTES.PRODUCT_LIST, { categoryId: 'budget', title: 'Budget Deals' })
          }
          className="flex-1 rounded-3xl bg-blue-50 px-5 py-5"
        >
          <Text className="text-xs font-extrabold text-[#1F6FEB]">BUDGET</Text>
          <Text className="mt-1 text-xl font-extrabold text-gray-900">Under ₹499</Text>
          <Text className="mt-2 text-xs font-semibold text-gray-600">Fast delivery</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate(ROUTES.PRODUCT_LIST, { categoryId: 'discount', title: 'Big Discounts' })
          }
          className="flex-1 rounded-3xl bg-yellow-50 px-5 py-5"
        >
          <Text className="text-xs font-extrabold text-gray-900">DISCOUNTS</Text>
          <Text className="mt-1 text-xl font-extrabold text-gray-900">Up to 70%</Text>
          <Text className="mt-2 text-xs font-semibold text-gray-600">Limited time</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

