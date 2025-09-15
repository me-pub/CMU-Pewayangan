import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Pressable, TextInput } from 'react-native';
import { getLampahanList } from '../../src/lib/storage';
import { useAppStore } from '../../src/state/store';
import { getTheme } from '../../src/lib/theme';

type Assoc = { name: string; role?: string; description?: string; lampahan: { id: string; title: string }[] };

export default function WikiScreen() {
  const mode = useAppStore((s) => s.mode);
  const t = getTheme(mode);
  const list = useMemo(() => getLampahanList(), []);
  const [q, setQ] = useState('');

  const charactersMap = new Map<string, Assoc>();
  const objectsMap = new Map<string, Assoc>();

  list.forEach((l) => {
    const w = l.modern?.wiki;
    if (w?.characters) {
      w.characters.forEach((c) => {
        const key = c.name.trim();
        const entry = charactersMap.get(key) ?? { name: c.name, role: c.role, description: c.description, lampahan: [] };
        entry.lampahan.push({ id: l.id, title: l.title });
        charactersMap.set(key, entry);
      });
    }
    if (w?.objects) {
      w.objects.forEach((o) => {
        const key = o.name.trim();
        const entry = objectsMap.get(key) ?? { name: o.name, description: o.description, lampahan: [] };
        entry.lampahan.push({ id: l.id, title: l.title });
        objectsMap.set(key, entry);
      });
    }
  });

  const filter = (s: string) => s.toLowerCase().includes(q.trim().toLowerCase());
  const characters = Array.from(charactersMap.values())
    .filter((c) =>
      q.trim().length === 0 ||
      filter(c.name) || (c.role ? filter(c.role) : false) || (c.description ? filter(c.description) : false) ||
      c.lampahan.some((lp) => filter(lp.title))
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const objects = Array.from(objectsMap.values())
    .filter((o) => q.trim().length === 0 || filter(o.name) || (o.description ? filter(o.description) : false) || o.lampahan.some((lp) => filter(lp.title)))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: t.text, marginBottom: 8 }}>Wiki</Text>
        <TextInput
          placeholder="Search characters, objects, or lampahan"
          value={q}
          onChangeText={setQ}
          placeholderTextColor={t.textMuted}
          style={{ borderWidth: 1, borderColor: t.border, backgroundColor: t.surface, color: t.text, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 }}
        />

        <Text style={{ fontSize: 18, fontWeight: '700', color: t.text, marginTop: 8, marginBottom: 8 }}>Karakter</Text>
        {characters.length === 0 ? <Text style={{ color: t.textMuted }}>Belum ada data karakter.</Text> : null}
        {characters.map((c, idx) => (
          <View key={idx} style={{ backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <Text style={{ fontWeight: '700', color: t.text }}>{c.name}</Text>
            {c.role ? <Text style={{ color: t.textMuted }}>{c.role}</Text> : null}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 }}>
              {c.lampahan.map((lp) => (
                <Link key={lp.id} href={{ pathname: '/lampahan/[id]', params: { id: lp.id } }} asChild>
                  <Pressable style={{ paddingHorizontal: 10, paddingVertical: 6, backgroundColor: t.surface, borderRadius: 999, borderWidth: 1, borderColor: t.border }}>
                    <Text style={{ color: t.text }}>{lp.title}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        ))}

        <Text style={{ fontSize: 18, fontWeight: '700', color: t.text, marginTop: 16, marginBottom: 8 }}>Objek</Text>
        {objects.length === 0 ? <Text style={{ color: t.textMuted }}>Belum ada data objek.</Text> : null}
        {objects.map((o, idx) => (
          <View key={idx} style={{ backgroundColor: t.background, borderWidth: 1, borderColor: t.border, borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <Text style={{ fontWeight: '700', color: t.text }}>{o.name}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 }}>
              {o.lampahan.map((lp) => (
                <Link key={lp.id} href={{ pathname: '/lampahan/[id]', params: { id: lp.id } }} asChild>
                  <Pressable style={{ paddingHorizontal: 10, paddingVertical: 6, backgroundColor: t.surface, borderRadius: 999, borderWidth: 1, borderColor: t.border }}>
                    <Text style={{ color: t.text }}>{lp.title}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
