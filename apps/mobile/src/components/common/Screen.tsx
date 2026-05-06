import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  contentClassName?: string;
  className?: string;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
};

export function Screen({
  children,
  scroll,
  className,
  contentClassName,
  edges = ['top'],
}: Props) {
  const content = (
    <View className={contentClassName ?? 'px-4 pb-6'}>{children}</View>
  );

  return (
    <SafeAreaView className={className ?? 'flex-1 bg-[#F6F7FB]'} edges={edges}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View className="flex-1">{content}</View>
      )}
    </SafeAreaView>
  );
}

