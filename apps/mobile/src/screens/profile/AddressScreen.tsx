import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { useAddressStore } from '../../store/addressStore';
import { Ionicons } from '@expo/vector-icons';
import { PressScale } from '../../components/common/PressScale';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';

export function AddressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const addresses = useAddressStore((s) => s.addresses);
  const setDefault = useAddressStore((s) => s.setDefault);
  const remove = useAddressStore((s) => s.remove);

  return (
    <Screen className="flex-1 bg-[#F6F7FB]" contentClassName="px-4 pb-8">
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-base font-extrabold text-gray-900">Address</Text>
        <PressScale
          onPress={() => navigation.navigate(ROUTES.ADD_ADDRESS)}
          className="rounded-full bg-[#1F6FEB] px-4 py-2"
        >
          <Text className="text-xs font-extrabold text-white">Add</Text>
        </PressScale>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(a) => a.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-3xl bg-white p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-extrabold text-gray-900">{item.name}</Text>
              {item.isDefault ? (
                <View className="rounded-full bg-blue-50 px-3 py-1">
                  <Text className="text-[11px] font-extrabold text-[#1F6FEB]">Default</Text>
                </View>
              ) : null}
            </View>
            <Text className="mt-1 text-xs font-semibold text-gray-600">{item.phone}</Text>
            <Text className="mt-2 text-sm text-gray-800">
              {item.addressLine}, {item.city}, {item.state} - {item.pincode}
            </Text>

            <View className="mt-4 flex-row items-center justify-between">
              <Pressable
                onPress={() => setDefault(item.id)}
                className="flex-row items-center rounded-full bg-gray-100 px-3 py-2"
              >
                <Ionicons name="checkmark-circle-outline" size={16} color="#111827" />
                <Text className="ml-2 text-xs font-extrabold text-gray-900">Set default</Text>
              </Pressable>

              <Pressable
                onPress={() => remove(item.id)}
                className="flex-row items-center rounded-full bg-gray-100 px-3 py-2"
              >
                <Ionicons name="trash-outline" size={16} color="#111827" />
                <Text className="ml-2 text-xs font-extrabold text-gray-900">Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View className="rounded-3xl bg-gray-50 p-4">
            <Text className="text-sm font-semibold text-gray-900">
              Add/Edit/Delete UI is ready (mock only). Backend integration can wire these actions.
            </Text>
          </View>
        }
      />
    </Screen>
  );
}

