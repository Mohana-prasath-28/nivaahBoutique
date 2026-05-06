import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressScale } from './PressScale';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'dark' | 'outline';
  className?: string;
};

export function GradientButton({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  className,
}: Props) {
  const isDisabled = disabled || loading;

  if (variant === 'outline') {
    return (
      <PressScale
        disabled={isDisabled}
        onPress={onPress}
        className={[
          'h-12 items-center justify-center rounded-2xl border border-gray-200 bg-white',
          isDisabled ? 'opacity-60' : '',
          className ?? '',
        ].join(' ')}
      >
        {loading ? <ActivityIndicator color="#111827" /> : <Text className="text-sm font-extrabold text-gray-900">{title}</Text>}
      </PressScale>
    );
  }

  if (variant === 'dark') {
    return (
      <PressScale
        disabled={isDisabled}
        onPress={onPress}
        className={[
          'h-12 items-center justify-center rounded-2xl bg-gray-900',
          isDisabled ? 'opacity-60' : '',
          className ?? '',
        ].join(' ')}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-sm font-extrabold text-white">{title}</Text>}
      </PressScale>
    );
  }

  return (
    <PressScale
      disabled={isDisabled}
      onPress={onPress}
      className={['h-12 overflow-hidden rounded-2xl', isDisabled ? 'opacity-60' : '', className ?? ''].join(' ')}
    >
      <LinearGradient
        colors={['#1F6FEB', '#2563EB', '#1D4ED8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View className="h-12 items-center justify-center">
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-sm font-extrabold text-white">{title}</Text>}
        </View>
      </LinearGradient>
    </PressScale>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

