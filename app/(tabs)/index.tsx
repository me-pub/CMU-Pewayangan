import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View, LayoutAnimation } from 'react-native';
import Fuse from 'fuse.js';
import { getLampahanList } from '../../src/lib/storage';
import { useAppStore } from '../../src/state/store';
import { getTheme } from '../../src/lib/theme';

export default function IndexScreen() {
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);
  const t = getTheme(mode);
  const [q, setQ] = useState('');
  const data = useMemo(() => getLampahanList(), []);
  const fuse = useMemo(
    () => new Fuse(data, { keys: ['title', 'tags'], threshold: 0.35, includeScore: true }),
    [data]
  );
  const results = q.trim().length > 0 ? fuse.search(q).map((r) => r.item) : data;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [mode]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }}>
      <View style={{ padding: 16, gap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: t.text }}>Catch Me Up Wayang</Text>
          <Pressable
            onPress={() => setMode(mode === 'authentic' ? 'modern' : 'authentic')}
            style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: t.surface, borderRadius: 8, borderWidth: 1, borderColor: t.border }}
          >
            <Text style={{ color: t.text }}>{mode === 'authentic' ? 'Authentic' : 'Modern'}</Text>
          </Pressable>
        </View>

        <TextInput
          placeholder="Search lampahan or tags"
          value={q}
          onChangeText={setQ}
          placeholderTextColor={t.textMuted}
          style={{ borderWidth: 1, borderColor: t.border, backgroundColor: t.surface, color: t.text, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 }}
        />
      </View>

      <Text style={{ paddingHorizontal: 16, paddingBottom: 8, fontWeight: '600', color: t.text }}>Lampahan</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/lampahan/[id]', params: { id: item.id } }} asChild>
            <Pressable style={{ padding: 16, borderRadius: 12, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: t.text }}>{item.title}</Text>
              {item.tags?.length ? (
                <Text style={{ color: t.textMuted, marginTop: 4 }}>{item.tags.join(' • ')}</Text>
              ) : null}
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
