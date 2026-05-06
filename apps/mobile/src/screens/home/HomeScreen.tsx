import React, { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { TabsParamList } from "../../types/navigation";
import { ROUTES } from "../../navigation/routeStrings";
import { Screen } from "../../components/common/Screen";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { OfferBannerCarousel } from "../../components/banners/OfferBannerCarousel";
import { SectionHeader } from "../../components/common/SectionHeader";
import { CategoryTile } from "../../components/cards/CategoryTile";
import { mockCategories, mockProducts } from "../../store/mockData";
import { ProductCard } from "../../components/cards/ProductCard";
import { Skeleton } from "../../components/loaders/Skeleton";
import { useCartStore } from "../../store/cartStore";
import { PressScale } from "../../components/common/PressScale";
import { GradientButton } from "../../components/common/GradientButton";
import { LinearGradient } from "expo-linear-gradient";

type Props = BottomTabScreenProps<TabsParamList, typeof ROUTES.TAB_HOME>;

export function HomeScreen(_: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const addToCart = useCartStore((s) => s.add);
  const [loading] = useState(false);

  const banners = useMemo(
    () => [
      {
        id: "b1",
        imageUrl:
          "https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?auto=format&fit=crop&w=900&q=60",
      },
      {
        id: "b2",
        imageUrl:
          "https://images.unsplash.com/photo-1706685481823-b8f1a1c11fca?auto=format&fit=crop&w=900&q=60",
      },
      {
        id: "b3",
        imageUrl:
          "https://images.unsplash.com/photo-1742677143629-b9784beab2e1?auto=format&fit=crop&w=900&q=60",
      },
    ],
    [],
  );

  const budgetDeals = useMemo(() => [499, 999], []);

  const goToTabCategory = () =>
    navigation.navigate(ROUTES.TABS, { screen: ROUTES.TAB_CATEGORY });

  const goToList = (title: string, categoryId: string) =>
    navigation.navigate(ROUTES.PRODUCT_LIST, { title, categoryId });

  return (
    <Screen scroll contentClassName="px-4 pb-8">
      <Animated.View entering={FadeInDown.duration(350).springify()}>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.SEARCH)}
          className="mt-4 flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3"
        >
          <Ionicons name="search-outline" size={18} color="#6B7280" />
          <Text className="ml-2 flex-1 text-sm text-gray-500">
            Search for products, brands and more
          </Text>
        </Pressable>
      </Animated.View>

      {/* 1) Categories grid */}
      <View className="mt-6">
        <SectionHeader
          title="Top Categories"
          actionText="View all"
          onPressAction={goToTabCategory}
        />
        <View className="rounded-3xl bg-white p-4">
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {mockCategories.slice(0, 8).map((c) => (
              <CategoryTile
                key={c.id}
                item={c}
                onPress={() =>
                  navigation.navigate(ROUTES.PRODUCT_LIST, {
                    categoryId: c.id,
                    title: c.title,
                  })
                }
              />
            ))}
          </View>
        </View>
      </View>

      {/* 2) Banner carousel (offers + festival style) */}
      {loading ? (
        <View className="mt-4">
          <Skeleton className="h-40 rounded-3xl bg-gray-200" />
        </View>
      ) : (
        <OfferBannerCarousel banners={banners} />
      )}

      {/* 3) Flash sale */}
      <View className="mt-6">
        <SectionHeader
          title="Flash Sale"
          actionText="See all"
          onPressAction={() => goToList('Flash Sale', 'flash')}
        />
        <View className="-mx-4">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockProducts.slice(0, 10)}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <View className="mr-3">
                <ProductCard
                  product={item}
                  onPress={() =>
                    navigation.navigate(ROUTES.PRODUCT_DETAILS, {
                      productId: item.id,
                    })
                  }
                  onAddToCart={() => addToCart(item)}
                />
              </View>
            )}
            initialNumToRender={6}
            windowSize={5}
            removeClippedSubviews
            contentContainerStyle={{ paddingLeft: 0, paddingRight: 16 }}
          />
        </View>
      </View>

      {/* 4) Trending products */}
      <View className="mt-6">
        <SectionHeader
          title="Trending"
          actionText="See all"
          onPressAction={() => goToList('Trending', 'trending')}
        />
        <View className="rounded-3xl bg-white p-4">
          <View className="flex-row flex-wrap justify-between">
            {mockProducts.slice(10, 14).map((p) => (
              <PressScale
                key={p.id}
                onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: p.id })}
                className="mb-3 w-[48%] overflow-hidden rounded-3xl border border-gray-100 bg-white"
              >
                <Image source={{ uri: p.images[0] }} className="h-28 w-full bg-gray-100" />
                <View className="p-3">
                  <Text numberOfLines={1} className="text-xs font-extrabold text-gray-900">
                    {p.title}
                  </Text>
                  <Text className="mt-1 text-[11px] font-semibold text-gray-500">{p.brand}</Text>
                  <GradientButton
                    title="Add to Cart"
                    variant="outline"
                    className="mt-3"
                    onPress={() => addToCart(p)}
                  />
                </View>
              </PressScale>
            ))}
          </View>
        </View>
      </View>

      {/* 5) Brand showcase */}
      <View className="mt-6">
        <SectionHeader title="Top Brands" actionText="See all" onPressAction={() => goToList('Top Brands', 'brands')} />
        <View className="flex-row justify-between rounded-3xl bg-white p-4">
          {["Nivaah", "Urban", "Nova", "Aroma"].map((b) => (
            <View
              key={b}
              className="w-[23%] items-center rounded-2xl bg-gray-50 py-4"
            >
              <Text className="text-xs font-extrabold text-gray-900">{b}</Text>
              <Text className="mt-1 text-[11px] font-semibold text-gray-500">
                Up to 60%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 6) Recommended */}
      <View className="mt-6">
        <SectionHeader title="Recommended for you" actionText="See all" onPressAction={() => goToList('Recommended', 'recommended')} />
        <View className="rounded-3xl bg-white p-4">
          {mockProducts.slice(4, 7).map((p) => (
            <PressScale
              key={p.id}
              onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: p.id })}
              className="mb-3 flex-row overflow-hidden rounded-3xl border border-gray-100 bg-white"
            >
              <Image source={{ uri: p.images[0] }} className="h-24 w-24 bg-gray-100" />
              <View className="flex-1 p-3">
                <Text numberOfLines={2} className="text-sm font-extrabold text-gray-900">
                  {p.title}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-gray-500">{p.brand}</Text>
                <GradientButton
                  title="Add"
                  variant="dark"
                  className="mt-3"
                  onPress={() => addToCart(p)}
                />
              </View>
            </PressScale>
          ))}
        </View>
      </View>

      {/* 7) Budget deals */}
      <View className="mt-6">
        <SectionHeader title="Budget Deals" actionText="See all" onPressAction={() => goToList('Budget Deals', 'budget')} />
        <View className="flex-row gap-3">
          {budgetDeals.map((p) => (
            <Pressable
              key={p}
              className="flex-1 rounded-3xl bg-[#111827] px-5 py-5"
              onPress={() =>
                navigation.navigate(ROUTES.PRODUCT_LIST, {
                  categoryId: "budget",
                  title: `Under ₹${p}`,
                })
              }
            >
              <Text className="text-xs font-semibold text-white/80">
                Starting under
              </Text>
              <Text className="mt-1 text-2xl font-extrabold text-white">
                ₹{p}
              </Text>
              <Text className="mt-2 text-xs font-bold text-white/80">
                Shop now
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* 8) New arrivals */}
      <View className="mt-6">
        <SectionHeader title="New Arrivals" actionText="See all" onPressAction={() => goToList('New Arrivals', 'new')} />
        <View className="-mx-4">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={mockProducts.slice(18, 24)}
            keyExtractor={(p) => p.id}
            renderItem={({ item }) => (
              <PressScale
                onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: item.id })}
                className="mr-3 overflow-hidden rounded-3xl bg-white"
              >
                <Image source={{ uri: item.images[0] }} className="h-40 w-64 bg-gray-100" />
                <View className="p-4">
                  <Text numberOfLines={1} className="text-sm font-extrabold text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-xs font-semibold text-gray-500">{item.brand}</Text>
                </View>
              </PressScale>
            )}
            contentContainerStyle={{ paddingLeft: 0, paddingRight: 16 }}
          />
        </View>
      </View>

      {/* 9) Big discount banner */}
      <View className="mt-6 rounded-3xl bg-[#FFB300] px-5 py-6">
        <Text className="text-xs font-extrabold text-gray-900">
          BIG DISCOUNT
        </Text>
        <Text className="mt-1 text-2xl font-extrabold text-gray-900">
          Up to 75% Off
        </Text>
        <Text className="mt-2 text-sm font-semibold text-gray-900/80">
          Limited stock • Fast delivery across India
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate(ROUTES.PRODUCT_LIST, {
              categoryId: "discount",
              title: "Big Discount",
            })
          }
          className="mt-4 self-start rounded-full bg-gray-900 px-5 py-3"
        >
          <Text className="text-sm font-extrabold text-white">Shop Deals</Text>
        </Pressable>
      </View>

      {/* 10) Recently viewed */}
      <View className="mt-6">
        <SectionHeader title="Recently Viewed" actionText="See all" onPressAction={() => goToList('Recently Viewed', 'recent')} />
        <View className="flex-row flex-wrap gap-3">
          {mockProducts.slice(2, 8).map((p) => (
            <PressScale
              key={p.id}
              onPress={() => navigation.navigate(ROUTES.PRODUCT_DETAILS, { productId: p.id })}
              className="w-[48%] flex-row items-center overflow-hidden rounded-3xl bg-white p-3"
            >
              <Image source={{ uri: p.images[0] }} className="h-12 w-12 rounded-2xl bg-gray-100" />
              <View className="ml-3 flex-1">
                <Text numberOfLines={1} className="text-xs font-extrabold text-gray-900">
                  {p.title}
                </Text>
                <Text className="mt-0.5 text-[11px] font-semibold text-gray-500">{p.brand}</Text>
              </View>
            </PressScale>
          ))}
        </View>
      </View>

      {/* 11) Popular collections */}
      <View className="mt-6">
        <SectionHeader title="Popular Collections" actionText="See all" onPressAction={() => goToList('Popular Collections', 'collections')} />
        <View className="-mx-4">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              {
                title: "Wedding Sarees",
                subtitle: "Premium weaves",
                image:
                  "https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Office Wear",
                subtitle: "Comfort + style",
                image:
                  "https://images.unsplash.com/photo-1706685481823-b8f1a1c11fca?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Festive Picks",
                subtitle: "Zari & borders",
                image:
                  "https://images.unsplash.com/photo-1742677143629-b9784beab2e1?auto=format&fit=crop&w=900&q=60",
              },
              {
                title: "Gifts Under ₹999",
                subtitle: "Best value",
                image:
                  "https://images.unsplash.com/photo-1749317776467-6dcf2bfbd26b?auto=format&fit=crop&w=900&q=60",
              },
            ]}
            keyExtractor={(i) => i.title}
            renderItem={({ item }) => (
              <PressScale
                onPress={() =>
                  navigation.navigate(ROUTES.PRODUCT_LIST, {
                    categoryId: "col",
                    title: item.title,
                  })
                }
                className="mr-3 overflow-hidden rounded-3xl bg-white"
              >
                <View className="relative h-44 w-72">
                  <Image source={{ uri: item.image }} className="h-44 w-72 bg-gray-100" />
                  <LinearGradient
                    colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.65)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
                  />
                  <View className="absolute bottom-0 left-0 right-0 p-4">
                    <Text className="text-base font-extrabold text-white">{item.title}</Text>
                    <Text className="mt-1 text-xs font-semibold text-white/85">{item.subtitle}</Text>
                    <View className="mt-3 self-start rounded-full bg-white/15 px-4 py-2">
                      <Text className="text-xs font-extrabold text-white">Explore</Text>
                    </View>
                  </View>
                </View>
              </PressScale>
            )}
            contentContainerStyle={{ paddingLeft: 0, paddingRight: 16 }}
          />
        </View>
      </View>
    </Screen>
  );
}
