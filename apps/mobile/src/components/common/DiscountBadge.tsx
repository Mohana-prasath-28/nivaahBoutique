import React from 'react';
import { Text, View } from 'react-native';

export function DiscountBadge({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  return (
    <View
      className={[
        'rounded-full bg-red-600 px-2.5 py-1',
        className ?? '',
      ].join(' ')}
    >
      <Text className="text-[11px] font-extrabold text-white">{percent}% OFF</Text>
    </View>
  );
}

