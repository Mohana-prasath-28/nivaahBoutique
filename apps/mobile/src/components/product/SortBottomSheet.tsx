import React, { memo, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const options = [
  'Relevance',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
  'Rating',
] as const;

export type SortOption = (typeof options)[number];

export const SortBottomSheet = memo(function SortBottomSheet({
  sheetRef,
  value,
  onChange,
}: {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  const snapPoints = useMemo(() => ['40%'], []);

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={{ borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: '#E5E7EB' }}
    >
      <BottomSheetView style={{ padding: 16 }}>
        <Text className="text-base font-extrabold text-gray-900">Sort by</Text>
        <View className="mt-4">
          {options.map((opt) => {
            const active = opt === value;
            return (
              <Pressable
                key={opt}
                onPress={() => {
                  onChange(opt);
                  sheetRef.current?.dismiss();
                }}
                className={[
                  'mb-3 rounded-2xl border px-4 py-4',
                  active ? 'border-[#1F6FEB] bg-blue-50' : 'border-gray-200 bg-white',
                ].join(' ')}
              >
                <Text
                  className={[
                    'text-sm font-extrabold',
                    active ? 'text-[#1F6FEB]' : 'text-gray-900',
                  ].join(' ')}
                >
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

