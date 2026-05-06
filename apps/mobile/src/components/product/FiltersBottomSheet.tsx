import React, { memo, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

export type FiltersState = {
  price: 'Any' | 'Under 499' | 'Under 999' | 'Under 1999';
  rating: 'Any' | '4+' | '3+';
  delivery: 'Any' | 'Tomorrow';
};

export const defaultFilters: FiltersState = {
  price: 'Any',
  rating: 'Any',
  delivery: 'Any',
};

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={[
        'rounded-full border px-4 py-2',
        active ? 'border-[#1F6FEB] bg-blue-50' : 'border-gray-200 bg-white',
      ].join(' ')}
    >
      <Text
        className={[
          'text-xs font-extrabold',
          active ? 'text-[#1F6FEB]' : 'text-gray-900',
        ].join(' ')}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export const FiltersBottomSheet = memo(function FiltersBottomSheet({
  sheetRef,
  value,
  onChange,
  onApply,
  onClear,
}: {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  const snapPoints = useMemo(() => ['55%'], []);

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={{ borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: '#E5E7EB' }}
    >
      <BottomSheetView style={{ padding: 16, flex: 1 }}>
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-extrabold text-gray-900">Filters</Text>
          <Pressable
            onPress={() => {
              onClear();
            }}
            hitSlop={12}
          >
            <Text className="text-sm font-extrabold text-[#1F6FEB]">Clear</Text>
          </Pressable>
        </View>

        <View className="mt-5">
          <Text className="text-xs font-extrabold text-gray-500">PRICE</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {(['Any', 'Under 499', 'Under 999', 'Under 1999'] as const).map((p) => (
              <Chip
                key={p}
                label={p === 'Any' ? 'Any' : `₹ ${p.replace('Under ', '')}`}
                active={value.price === p}
                onPress={() => onChange({ ...value, price: p })}
              />
            ))}
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xs font-extrabold text-gray-500">RATING</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {(['Any', '4+', '3+'] as const).map((r) => (
              <Chip
                key={r}
                label={r === 'Any' ? 'Any' : `${r} ⭐`}
                active={value.rating === r}
                onPress={() => onChange({ ...value, rating: r })}
              />
            ))}
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xs font-extrabold text-gray-500">DELIVERY</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {(['Any', 'Tomorrow'] as const).map((d) => (
              <Chip
                key={d}
                label={d === 'Any' ? 'Any' : 'Delivery by Tomorrow'}
                active={value.delivery === d}
                onPress={() => onChange({ ...value, delivery: d })}
              />
            ))}
          </View>
        </View>

        <View className="mt-auto flex-row gap-3 pt-6">
          <Pressable
            onPress={() => sheetRef.current?.dismiss()}
            className="flex-1 rounded-2xl bg-gray-100 py-4"
          >
            <Text className="text-center text-sm font-extrabold text-gray-900">Close</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onApply();
              sheetRef.current?.dismiss();
            }}
            className="flex-1 rounded-2xl bg-gray-900 py-4"
          >
            <Text className="text-center text-sm font-extrabold text-white">Apply</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

