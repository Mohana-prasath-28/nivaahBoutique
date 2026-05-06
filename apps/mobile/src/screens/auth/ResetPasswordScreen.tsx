import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Screen } from '../../components/common/Screen';
import { TextField } from '../../components/common/TextField';
import { GradientButton } from '../../components/common/GradientButton';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.RESET_PASSWORD>;

export function ResetPasswordScreen({ route, navigation }: Props) {
  const { phone } = route.params;
  const [password, setPassword] = useState('');

  return (
    <Screen className="flex-1 bg-white" contentClassName="px-5 pt-10">
      <Text className="text-xl font-extrabold text-gray-900">Reset password</Text>
      <Text className="mt-2 text-sm text-gray-600">For {phone}</Text>

      <TextField
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="New password"
        containerClassName="mt-6"
      />

      <GradientButton
        title="Update & Login"
        className="mt-8"
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      />
    </Screen>
  );
}

