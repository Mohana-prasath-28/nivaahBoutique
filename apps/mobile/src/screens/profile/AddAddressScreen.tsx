import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Screen } from '../../components/common/Screen';
import { TextField } from '../../components/common/TextField';
import { GradientButton } from '../../components/common/GradientButton';
import { useAddressStore } from '../../store/addressStore';
import { formatPhoneIndia } from '../../constants/formatters';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.ADD_ADDRESS>;

export function AddAddressScreen({ navigation }: Props) {
  const add = useAddressStore((s) => s.add);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [addressLine, setAddressLine] = useState('');

  const canSave = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      phone.replace(/\D/g, '').length === 10 &&
      pincode.replace(/\D/g, '').length === 6 &&
      city.trim().length >= 2 &&
      state.trim().length >= 2 &&
      addressLine.trim().length >= 6
    );
  }, [addressLine, city, name, phone, pincode, state]);

  return (
    <Screen edges={[]} scroll className="flex-1 bg-[#F6F7FB]" contentClassName="px-4 pb-8">

      <View className="mt-4 rounded-3xl bg-white p-5">
        <TextField
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Full name"
        />

        <View className="mt-4">
          <TextField
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="10-digit number"
            left={<Text className="text-sm font-extrabold text-gray-900">+91</Text>}
          />
        </View>

        <View className="mt-4">
          <TextField
            label="Pincode"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="6-digit pincode"
          />
        </View>

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1">
            <TextField label="City" value={city} onChangeText={setCity} placeholder="City" />
          </View>
          <View className="flex-1">
            <TextField label="State" value={state} onChangeText={setState} placeholder="State" />
          </View>
        </View>

        <View className="mt-4">
          <TextField
            label="Address"
            value={addressLine}
            onChangeText={setAddressLine}
            placeholder="House no, street, area"
          />
        </View>
      </View>

      <GradientButton
        title="Save Address"
        className="mt-6"
        disabled={!canSave}
        onPress={() => {
          add({
            id: `a${Date.now()}`,
            name: name.trim(),
            phone: formatPhoneIndia(phone),
            pincode: pincode.replace(/\D/g, ''),
            city: city.trim(),
            state: state.trim(),
            addressLine: addressLine.trim(),
            isDefault: false,
          });
          navigation.goBack();
        }}
      />
    </Screen>
  );
}

