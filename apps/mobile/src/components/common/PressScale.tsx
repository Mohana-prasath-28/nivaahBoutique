import React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressScale({
  children,
  scaleTo = 0.98,
  ...props
}: PressableProps & { scaleTo?: number }) {
  const s = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }));

  return (
    <AnimatedPressable
      {...props}
      onPressIn={(e) => {
        s.value = withSpring(scaleTo, { damping: 16, stiffness: 240 });
        props.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        s.value = withSpring(1, { damping: 16, stiffness: 240 });
        props.onPressOut?.(e);
      }}
      style={[style, props.style]}
    >
      {children}
    </AnimatedPressable>
  );
}

