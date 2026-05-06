import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type Props = ViewProps & {
  className?: string;
  roundedClassName?: string;
};

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

export function Skeleton({ className, style, roundedClassName, ...rest }: Props) {
  const t = useSharedValue(0);

  React.useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [t]);

  const shimmer = useAnimatedStyle(() => {
    const x = interpolate(t.value, [0, 1], [-90, 180]);
    return { transform: [{ translateX: x }] };
  });

  return (
    <View
      {...rest}
      className={[className ?? 'bg-gray-200 overflow-hidden', roundedClassName ?? 'rounded-2xl'].join(
        ' ',
      )}
      style={style}
    >
      <AnimatedLG
        colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFillObject, shimmer]}
      />
    </View>
  );
}

