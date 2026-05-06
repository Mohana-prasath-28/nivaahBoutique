import React, { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { mockProducts } from '../../store/mockData';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.RETURN>;

const reasons = ['Wrong size', 'Damaged', 'Not as described', 'Changed mind', 'Other'] as const;
type Reason = (typeof reasons)[number];

export function ReturnScreen({ route, navigation }: Props) {
  const { orderId, productId } = route.params;
  const product = useMemo(() => mockProducts.find((p) => p.id === productId), [productId]);

  const [reason, setReason] = useState<Reason>('Changed mind');
  const [comment, setComment] = useState('');

  if (!product) {
    return (
      <Screen className="flex-1 bg-[#F6F7FB]">
        <View className="mt-10 px-4">
          <EmptyState
            icon="refresh-outline"
            title="Return not available"
            description="We couldn't find this product."
            actionText="Go back"
            onPressAction={() => navigation.goBack()}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll className="flex-1 bg-[#F6F7FB]" contentClassName="px-4 pb-8">
      <Text className="mt-2 text-base font-extrabold text-gray-900">Return & Refunds</Text>
      <Text className="mt-1 text-xs font-semibold text-gray-500">Order {orderId}</Text>

      <View className="mt-4 rounded-3xl bg-white p-4">
        <Text className="text-sm font-extrabold text-gray-900">Item</Text>
        <Text className="mt-2 text-sm text-gray-700">{product.title}</Text>
        <Text className="mt-1 text-xs font-semibold text-gray-500">{product.brand}</Text>
      </View>

      <View className="mt-4 rounded-3xl bg-white p-4">
        <Text className="text-sm font-extrabold text-gray-900">Reason</Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {reasons.map((r) => {
            const active = r === reason;
            return (
              <Pressable
                key={r}
                onPress={() => setReason(r)}
                className={[
                  'rounded-full border px-4 py-2',
                  active ? 'border-[#1F6FEB] bg-blue-50' : 'border-gray-200 bg-gray-50',
                ].join(' ')}
              >
                <Text
                  className={[
                    'text-xs font-extrabold',
                    active ? 'text-[#1F6FEB]' : 'text-gray-900',
                  ].join(' ')}
                >
                  {r}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mt-4 rounded-3xl bg-white p-4">
        <Text className="text-sm font-extrabold text-gray-900">Comment (optional)</Text>
        <View className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Tell us more"
            className="text-sm text-gray-900"
            multiline
          />
        </View>
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        className="mt-6 rounded-2xl bg-gray-900 py-4"
      >
        <Text className="text-center text-sm font-extrabold text-white">Submit (UI only)</Text>
      </Pressable>
    </Screen>
  );
}

