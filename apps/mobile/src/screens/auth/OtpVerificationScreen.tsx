import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../types/navigation';
import { ROUTES } from '../../navigation/routeStrings';
import { Screen } from '../../components/common/Screen';
import { useAuthStore } from '../../store/authStore';
import { OtpTextInput } from '../../components/common/OtpTextInput';
import { GradientButton } from '../../components/common/GradientButton';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.OTP>;

export function OtpVerificationScreen({ route }: Props) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const login = useAuthStore((s) => s.login);
  const completeSignup = useAuthStore((s) => s.completeSignup);

  const canVerify = useMemo(() => otp.replace(/\D/g, '').length === 4, [otp]);
  const isSignupFlow = useAuthStore((s) => !!s.draftSignup.name);

  return (
    <Screen className="flex-1 bg-white" contentClassName="px-5 pt-10">
      <Text className="text-xl font-extrabold text-gray-900">Verify OTP</Text>
      <Text className="mt-2 text-sm text-gray-600">
        Enter the 4-digit code sent to {phone}.
      </Text>

      <View className="mt-8">
        <OtpTextInput
          otp={otp}
          setOtp={setOtp}
          digits={4}
          onFilled={(val) => setOtp(val)}
        />
      </View>

      <GradientButton
        title="Verify"
        className="mt-8"
        disabled={!canVerify}
        onPress={() => {
          // UI only: treat as verified
          login(phone);
          if (isSignupFlow) completeSignup();
        }}
      />

      <Text className="mt-6 text-center text-xs text-gray-500">
        Didn’t receive the code? Resend
      </Text>
    </Screen>
  );
}

