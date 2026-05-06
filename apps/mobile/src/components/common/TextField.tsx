import React from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

type Props = {
  label?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
} & TextInputProps;

export function TextField({
  label,
  left,
  right,
  containerClassName,
  inputClassName,
  ...props
}: Props) {
  return (
    <View>
      {label ? <Text className="text-xs font-semibold text-gray-500">{label}</Text> : null}
      <View
        className={[
          'mt-2 h-12 flex-row items-center rounded-2xl border border-gray-200 bg-gray-50 px-4',
          containerClassName ?? '',
        ].join(' ')}
      >
        {left ? <View className="mr-2">{left}</View> : null}
        <TextInput
          {...props}
          className={['flex-1 text-sm text-gray-900', inputClassName ?? ''].join(' ')}
          placeholderTextColor="#9CA3AF"
        />
        {right ? <View className="ml-2">{right}</View> : null}
      </View>
    </View>
  );
}

