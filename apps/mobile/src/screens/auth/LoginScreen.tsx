import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../types/navigation";
import { ROUTES } from "../../navigation/routeStrings";
import { Screen } from "../../components/common/Screen";
import { formatPhoneIndia } from "../../constants/formatters";
import { TextField } from "../../components/common/TextField";
import { GradientButton } from "../../components/common/GradientButton";

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.LOGIN>;

export function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const formatted = useMemo(() => formatPhoneIndia(phone), [phone]);

  return (
    <Screen className="flex-1 bg-white" contentClassName="px-5 pt-10">
      <Text className="text-2xl font-extrabold text-gray-900">
        Welcome back
      </Text>
      <Text className="mt-2 text-sm text-gray-600">
        Login with your phone number (+91)
      </Text>

      <View className="mt-8">
        <TextField
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
          maxLength={10}
          placeholder="Enter your phone number"
          left={
            <Text className="text-sm font-extrabold text-gray-900">+91</Text>
          }
        />
      </View>

      <GradientButton
        title="Send OTP"
        onPress={() => navigation.navigate(ROUTES.OTP, { phone: formatted })}
        className="mt-8"
      />

      <View className="mt-6 flex-row items-center justify-between">
        <View />
        <Pressable onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
          <Text className="text-sm font-semibold text-gray-900">
            New here? <Text className="text-[#1F6FEB]">Create account</Text>
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
