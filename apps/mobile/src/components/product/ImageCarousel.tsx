import React, { memo, useMemo } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width: W } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const ImageCarousel = memo(function ImageCarousel({ images }: { images: string[] }) {
  const itemW = useMemo(() => W, []);
  const itemH = Math.min(420, Math.round(W * 1.05));

  return (
    <View className="bg-white">
      <Carousel
        width={itemW}
        height={itemH}
        loop
        data={images}
        pagingEnabled
        renderItem={({ item, animationValue }) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(animationValue.value, [-1, 0, 1], [0.96, 1, 0.96]);
            return { transform: [{ scale }] };
          });
          return (
            <View className="flex-1 items-center justify-center bg-white">
              <AnimatedImage
                source={{ uri: item }}
                resizeMode="cover"
                className="h-full w-full bg-gray-100"
                style={style}
              />
            </View>
          );
        }}
      />
    </View>
  );
});

