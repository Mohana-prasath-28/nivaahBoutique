import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { Screen } from '../../components/common/Screen';
import { Ionicons } from '@expo/vector-icons';

const trending = ['Saree', 'Kurti', 'Smartwatch', 'Earbuds', 'Sneakers', 'Skincare'];

export function SearchScreen() {
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(['Wireless earbuds', 'Cotton saree']);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  const data = query.length ? [] : [...recent, ...trending];

  return (
    <Screen className="flex-1 bg-white" contentClassName="px-4 pt-3">
      <View className="flex-row items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Search products"
          className="ml-2 flex-1 text-base text-gray-900"
          returnKeyType="search"
          onSubmitEditing={() => {
            if (!query.trim()) return;
            setRecent((s) => [query.trim(), ...s.filter((x) => x !== query.trim())].slice(0, 6));
          }}
        />
        {!!query && (
          <Pressable onPress={() => setQuery('')} className="px-1 py-1">
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </Pressable>
        )}
      </View>

      <Text className="mt-5 text-xs font-semibold text-gray-500">
        {query.length ? 'Results' : 'Recent & Trending'}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setQuery(item)}
            className="mt-3 flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 py-4"
          >
            <Ionicons name="trending-up-outline" size={18} color="#6B7280" />
            <Text className="ml-3 text-sm font-semibold text-gray-900">{item}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="mt-6 rounded-3xl bg-gray-50 p-5">
            <Text className="text-sm font-semibold text-gray-900">
              Product results UI will appear here.
            </Text>
            <Text className="mt-1 text-sm text-gray-600">
              Next: results list + product cards + add-to-cart/wishlist actions.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

