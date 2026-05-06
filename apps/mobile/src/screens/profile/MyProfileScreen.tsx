import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/common/Screen';
import { useAuthStore } from '../../store/authStore';
import { TextField } from '../../components/common/TextField';
import { GradientButton } from '../../components/common/GradientButton';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.MY_PROFILE>;

export function MyProfileScreen({ navigation }: Props) {
  const user = useAuthStore((s) => s.user);
  const setDraft = useAuthStore((s) => s.setDraft);

  const initial = useMemo(
    () => ({
      name: user?.name ?? '',
      phone: user?.phone ?? '+91 ',
      email: user?.email ?? '',
      dob: user?.dob ?? '',
    }),
    [user?.dob, user?.email, user?.name, user?.phone],
  );

  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [dob, setDob] = useState(initial.dob);

  return (
    <Screen edges={[]} scroll className="flex-1 bg-[#F6F7FB]" contentClassName="px-4 pb-8">

      <View className="mt-4 rounded-3xl bg-white p-5">
        <Text className="text-xs font-extrabold text-gray-500">PHONE</Text>
        <Text className="mt-2 text-sm font-extrabold text-gray-900">{initial.phone}</Text>
        <Text className="mt-1 text-xs font-semibold text-gray-500">(+91 format)</Text>
      </View>

      <View className="mt-4 rounded-3xl bg-white p-5">
        <Text className="text-xs font-extrabold text-gray-500">NAME</Text>
        <TextField value={name} onChangeText={setName} placeholder="Full name" containerClassName="mt-3" />

        <Text className="mt-4 text-xs font-extrabold text-gray-500">EMAIL</Text>
        <TextField
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="name@email.com"
          containerClassName="mt-3"
        />

        <Text className="mt-4 text-xs font-extrabold text-gray-500">DOB</Text>
        <TextField value={dob} onChangeText={setDob} placeholder="DD/MM/YYYY" containerClassName="mt-3" />
      </View>

      <GradientButton
        title="Save"
        variant="dark"
        className="mt-6"
        onPress={() => {
          setDraft({ name, email, dob });
          navigation.goBack();
        }}
      />
    </Screen>
  );
}

