import { Link } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { getLampahanList } from '../../src/lib/storage';
import { useAppStore } from '../../src/state/store';

export default function HomeScreen() {
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);
  const data = useMemo(() => getLampahanList(), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#111' }}>Catch Me Up Wayang</Text>
        <Pressable
          onPress={() => setMode(mode === 'authentic' ? 'modern' : 'authentic')}
          style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#eee', borderRadius: 8 }}
        >
          <Text style={{ color: '#111' }}>{mode === 'authentic' ? 'Authentic' : 'Modern'}</Text>
        </Pressable>
      </View>

      <Text style={{ paddingHorizontal: 16, paddingBottom: 8, fontWeight: '600', color: '#111' }}>Lampahan</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/lampahan/[id]', params: { id: item.id } }} asChild>
            <Pressable style={{ padding: 16, borderRadius: 12, backgroundColor: '#faf6f2', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#111' }}>{item.title}</Text>
              {item.tags?.length ? (
                <Text style={{ color: '#555', marginTop: 4 }}>{item.tags.join(' • ')}</Text>
              ) : null}
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
