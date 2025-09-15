import { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View, Pressable } from 'react-native';
import Fuse from 'fuse.js';
import { getLampahanList } from '../../src/lib/storage';
import { Link } from 'expo-router';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const data = useMemo(() => getLampahanList(), []);
  const fuse = useMemo(
    () => new Fuse(data, { keys: ['title', 'aliases', 'tags'], threshold: 0.35, includeScore: true }),
    [data]
  );
  const results = q.trim().length > 0 ? fuse.search(q).map((r) => r.item) : data.slice(0, 20);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Search lampahan or characters"
          value={q}
          onChangeText={setQ}
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 }}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/lampahan/[id]', params: { id: item.id } }} asChild>
            <Pressable style={{ padding: 14, borderRadius: 10, backgroundColor: '#f6f6f6', marginBottom: 10 }}>
              <Text style={{ fontWeight: '600', color: '#111' }}>{item.title}</Text>
              {item.tags?.length ? <Text style={{ color: '#555', marginTop: 4 }}>{item.tags.join(' • ')}</Text> : null}
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
