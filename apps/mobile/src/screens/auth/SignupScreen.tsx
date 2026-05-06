import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../types/navigation";
import { ROUTES } from "../../navigation/routeStrings";
import { Screen } from "../../components/common/Screen";
import { GradientButton } from "../../components/common/GradientButton";
import { TextField } from "../../components/common/TextField";
import { useAuthStore } from "../../store/authStore";
import type { Gender } from "../../types/models";
import { formatPhoneIndia } from "../../constants/formatters";

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGNUP>;

export function SignupScreen({ navigation }: Props) {
  const setDraft = useAuthStore((s) => s.setDraft);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Gender>("Female");

  const canSendOtp = useMemo(
    () => phone.replace(/\D/g, "").length === 10,
    [phone],
  );
  const canCreate = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      dob.trim().length >= 8 &&
      canSendOtp &&
      email.trim().length >= 5
    );
  }, [canSendOtp, dob, email, name]);

  return (
    <Screen
      scroll
      className="flex-1 bg-white"
      contentClassName="px-5 pt-10 pb-10 flex-1 justify-between"
    >
      <View>
        <Text className="text-2xl font-extrabold text-gray-900">
          Create account
        </Text>
        <Text className="mt-2 text-sm text-gray-600">
          Enter your details to continue.
        </Text>

        <View className="mt-8 rounded-3xl bg-gray-50 p-4">
          <TextField
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Full name"
          />
          <View className="mt-4">
            <TextField
              label="DOB"
              value={dob}
              onChangeText={setDob}
              placeholder="DD/MM/YYYY"
            />
          </View>
          <View className="mt-4">
            <TextField
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="number-pad"
              maxLength={10}
              placeholder="10-digit number"
              left={
                <Text className="text-sm font-extrabold text-gray-900">+91</Text>
              }
            />
          </View>
          <View className="mt-4">
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="name@email.com"
            />
          </View>

          <Text className="mt-5 text-xs font-extrabold text-gray-500">
            GENDER
          </Text>
          <View className="mt-3 flex-row gap-2">
            {(["Male", "Female"] as const).map((g) => {
              const active = g === gender;
              return (
                <Pressable
                  key={g}
                  onPress={() => setGender(g)}
                  className={[
                    "flex-1 items-center rounded-2xl border py-3",
                    active
                      ? "border-[#1F6FEB] bg-blue-50"
                      : "border-gray-200 bg-white",
                  ].join(" ")}
                >
                  <Text
                    className={[
                      "text-sm font-extrabold",
                      active ? "text-[#1F6FEB]" : "text-gray-900",
                    ].join(" ")}
                  >
                    {g}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <GradientButton
          title="Create Account"
          className="mt-6"
          disabled={!canCreate}
          onPress={() => {
            const formattedPhone = formatPhoneIndia(phone);
            setDraft({ name, dob, email, phone: formattedPhone, gender });
            navigation.navigate(ROUTES.OTP, { phone: formattedPhone });
          }}
        />
      </View>

      <Pressable onPress={() => navigation.goBack()} className="mt-8">
        <Text className="text-center text-sm font-semibold text-gray-700">
          Already have an account? <Text className="text-[#1F6FEB]">Login</Text>
        </Text>
      </Pressable>
    </Screen>
  );
}
