import React from 'react';
import { Dimensions, View } from 'react-native';
import { OtpInput, type OtpInputRef } from 'react-native-otp-entry';

const width = Dimensions.get('window').width;

type Props = {
  otp: string;
  setOtp: (otp: string) => void;
  onFilled?: (otp: string) => void;
  digits?: number;
};

export function OtpTextInput({ otp, setOtp, onFilled, digits = 4 }: Props) {
  const ref = React.useRef<OtpInputRef>(null);

  React.useEffect(() => {
    ref.current?.setValue(otp);
  }, [otp]);

  return (
    <View>
      <OtpInput
        ref={ref}
        numberOfDigits={digits}
        onTextChange={(text: string) => setOtp(text)}
        onFilled={onFilled}
        autoFocus={false}
        textInputProps={{ returnKeyType: 'done' }}
        theme={{
          inputsContainerStyle: {
            justifyContent: 'center',
            gap: width * 0.04,
          },
          pinCodeContainerStyle: {
            width: 56,
            height: 56,
            borderRadius: 28,
            borderWidth: 1.5,
            borderColor: '#E5E7EB',
            backgroundColor: '#FFFFFF',
            marginHorizontal: 0,
          },
          focusedPinCodeContainerStyle: {
            borderWidth: 1.5,
            borderColor: '#1F6FEB',
            backgroundColor: '#EFF6FF',
          },
          pinCodeTextStyle: {
            fontSize: 20,
            fontWeight: '700',
            color: '#111827',
          },
        }}
      />
    </View>
  );
}

