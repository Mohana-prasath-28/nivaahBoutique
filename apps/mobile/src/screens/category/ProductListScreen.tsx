import React, { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Ionicons } from '@expo/vector-icons';
import { mockProducts } from '../../store/mockData';
import { ProductCard } from '../../components/cards/ProductCard';
import { useCartStore } from '../../store/cartStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SortBottomSheet, type SortOption } from '../../components/product/SortBottomSheet';
import {
  defaultFilters,
  FiltersBottomSheet,
  type FiltersState,
} from '../../components/product/FiltersBottomSheet';
import { EmptyState } from '../../components/common/EmptyState';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.PRODUCT_LIST>;

export function ProductListScreen({ route, navigation }: Props) {
  const addToCart = useCartStore((s) => s.add);

  const [sort, setSort] = useState<SortOption>('Relevance');
  const sortSheetRef = useRef<BottomSheetModal>(null);
  const filtersSheetRef = useRef<BottomSheetModal>(null);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const data = useMemo(() => {
    const list = [...mockProducts];
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    if (sort === 'Rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'Newest') list.sort((a, b) => (a.id < b.id ? 1 : -1));
    const filtered = list.filter((p) => {
      if (filters.delivery === 'Tomorrow' && p.deliveryText !== 'Delivery by Tomorrow') return false;
      if (filters.rating === '4+' && p.rating < 4) return false;
      if (filters.rating === '3+' && p.rating < 3) return false;
      if (filters.price === 'Under 499' && p.price > 499) return false;
      if (filters.price === 'Under 999' && p.price > 999) return false;
      if (filters.price === 'Under 1999' && p.price > 1999) return false;
      return true;
    });
    return filtered;
  }, [filters.delivery, filters.price, filters.rating, sort]);

  return (
    <Screen edges={[]} className="flex-1 bg-[#F6F7FB]" contentClassName="px-0 pb-0">
      <View className="bg-white px-4 pb-4 pt-4">
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => sortSheetRef.current?.present()}
            className="flex-1 flex-row items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-4 py-3"
          >
            <Ionicons name="swap-vertical" size={16} color="#111827" />
            <Text className="ml-2 text-xs font-extrabold text-gray-900">Sort</Text>
            <Text className="ml-2 text-[11px] font-semibold text-gray-500">{sort}</Text>
          </Pressable>
          <Pressable
            onPress={() => filtersSheetRef.current?.present()}
            className="flex-1 flex-row items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-4 py-3"
          >
            <Ionicons name="options-outline" size={16} color="#111827" />
            <Text className="ml-2 text-xs font-extrabold text-gray-900">Filters</Text>
            <Text className="ml-2 text-[11px] font-semibold text-gray-500">
              {filters.price === 'Any' && filters.rating === 'Any' && filters.delivery === 'Any'
                ? 'All'
                : 'Applied'}
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(p) => p.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={{ width: '48%', marginBottom: 12 }}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: item.id })}
              onAddToCart={() => addToCart(item)}
            />
          </View>
        )}
        initialNumToRender={8}
        windowSize={7}
        removeClippedSubviews
        ListEmptyComponent={
          <View style={{ paddingTop: 24 }}>
            <EmptyState
              icon="funnel-outline"
              title="No sarees found"
              description="Try clearing filters or change sort."
              actionText="Clear filters"
              onPressAction={() => setFilters(defaultFilters)}
            />
          </View>
        }
      />

      <SortBottomSheet sheetRef={sortSheetRef} value={sort} onChange={setSort} />
      <FiltersBottomSheet
        sheetRef={filtersSheetRef}
        value={filters}
        onChange={setFilters}
        onApply={() => {}}
        onClear={() => setFilters(defaultFilters)}
      />
    </Screen>
  );
}

