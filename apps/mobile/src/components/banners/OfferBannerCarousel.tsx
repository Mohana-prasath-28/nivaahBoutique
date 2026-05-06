import React, { memo, useMemo } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { PressScale } from "../common/PressScale";

const { width: W } = Dimensions.get("window");

type Banner = { id: string; imageUrl: string };

export const OfferBannerCarousel = memo(function OfferBannerCarousel({
  banners,
  onPressBanner,
}: {
  banners: Banner[];
  onPressBanner?: (id: string) => void;
}) {
  const itemW = useMemo(() => Math.min(W - 32, 380), []);
  const itemH = 160;

  return (
    <View className="mt-4">
      <Carousel
        width={itemW}
        height={itemH}
        loop
        autoPlay
        autoPlayInterval={3200}
        scrollAnimationDuration={650}
        data={banners}
        style={{ width: "100%" }}
        pagingEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.96,
          parallaxScrollingOffset: 32,
        }}
        renderItem={({ item }) => {
          return (
            <PressScale
              onPress={() => onPressBanner?.(item.id)}
              className="overflow-hidden rounded-3xl bg-white"
            >
              <Image
                source={{ uri: item.imageUrl }}
                resizeMode="cover"
                className="h-40 w-full bg-gray-100"
                fadeDuration={0}
              />
            </PressScale>
          );
        }}
      />
    </View>
  );
});
