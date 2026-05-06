import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { useWishlistStore } from '../../store/wishlistStore';
import { ProductCard } from '../../components/cards/ProductCard';
import { useCartStore } from '../../store/cartStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { mockProducts } from '../../store/mockData';
import { EmptyState } from '../../components/common/EmptyState';

export function WishlistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const ids = useWishlistStore((s) => s.ids);
  const items = useMemo(() => mockProducts.filter((p) => ids[p.id]), [ids]);
  const add = useCartStore((s) => s.add);

  return (
    <Screen className="flex-1 bg-[#F6F7FB]" contentClassName="px-4 pb-8">
      <Text className="mt-2 text-base font-extrabold text-gray-900">Wishlist</Text>
      <Text className="mt-1 text-xs font-semibold text-gray-500">{items.length} saved item(s)</Text>

      <FlatList
        data={items}
        keyExtractor={(p) => p.id}
        numColumns={2}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={{ width: '48%', marginBottom: 12 }}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: item.id })}
              onAddToCart={() => add(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View className="mt-10">
            <EmptyState
              icon="heart-outline"
              title="Your wishlist is empty"
              description="Tap the heart on any saree to save it here."
              actionText="Explore Sarees"
              onPressAction={() =>
                navigation.navigate(ROUTES.TABS, { screen: ROUTES.TAB_HOME })
              }
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

