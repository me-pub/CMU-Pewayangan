import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, SafeAreaView, Text, View, LayoutAnimation } from 'react-native';
import { getLampahanById } from '../../src/lib/storage';
import { useAppStore } from '../../src/state/store';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../../src/lib/theme';

export default function LampahanDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mode = useAppStore((s) => s.mode);
  const t = getTheme(mode);
  const item = id ? getLampahanById(id) : undefined;
  const setMode = useAppStore((s) => s.setMode);
  const saved = useAppStore((s) => s.saved);
  const addHistory = useAppStore((s) => s.addHistory);
  const [entity, setEntity] = useState<{ title: string; body?: string } | null>(null);

  useEffect(() => {
    if (item?.id) addHistory(item.id);
  }, [item?.id, addHistory]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [mode]);

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#111' }}>Not found</Text>
      </SafeAreaView>
    );
  }

  const isSaved = !!(item && saved[item.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }}>
      <Stack.Screen
        options={{
          title: item.title,
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={() => router.back()}
              style={{ paddingHorizontal: 8, paddingVertical: 4 }}
            >
              <Ionicons name="chevron-back" size={24} color={t.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Switch to ${mode === 'authentic' ? 'Modern' : 'Authentic'} mode`}
              onPress={() => setMode(mode === 'authentic' ? 'modern' : 'authentic')}
              style={{ paddingHorizontal: 10, paddingVertical: 6, backgroundColor: t.surface, borderRadius: 12, borderWidth: 1, borderColor: t.border }}
            >
              <Text style={{ color: t.text, fontWeight: '600' }}>{mode === 'authentic' ? 'Authentic' : 'Modern'}</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {mode === 'authentic' ? (
          <View>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Sinopsis</Text>
            <Text style={{ marginBottom: 16, color: t.text }}>{item.authentic.sinopsis}</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Cerita</Text>
            <Text style={{ marginBottom: 16, color: t.text }}>{item.authentic.full_cerita}</Text>
            {item.authentic.catatan_budaya?.length ? (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Catatan Budaya</Text>
                {item.authentic.catatan_budaya.map((c, idx) => (
                  <Text key={idx} style={{ marginBottom: 8, color: t.text }}>• {c}</Text>
                ))}
              </View>
            ) : null}
          </View>
        ) : (
          <View>
            {item.modern?.tldr ? (
              <View style={{ backgroundColor: t.surfaceAlt, padding: 12, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: t.border }}>
                <Text style={{ fontWeight: '700', marginBottom: 6, color: t.text }}>TL;DR</Text>
                <Text style={{ color: t.text }}>{item.modern.tldr}</Text>
              </View>
            ) : null}

            {item.modern?.keyEvents?.length ? (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Key Events</Text>
                <FlatList
                  data={item.modern.keyEvents}
                  keyExtractor={(_, i) => String(i)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: ev, index }) => (
                    <View
                      style={{
                        width: 220,
                        backgroundColor: t.surface,
                        borderWidth: 1,
                        borderColor: t.border,
                        borderRadius: 12,
                        padding: 12,
                        marginRight: 10,
                      }}
                    >
                      <Text style={{ fontWeight: '700', marginBottom: 6, color: t.text }}>{index + 1}. Peristiwa</Text>
                      <Text style={{ color: t.text }}>{ev}</Text>
                    </View>
                  )}
                />
              </View>
            ) : null}

            {item.modern?.wiki ? (
              <View>
                {item.modern.wiki.characters?.length ? (
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Karakter</Text>
                    {item.modern.wiki.characters.map((c, i) => (
                      <Pressable
                        key={i}
                        onPress={() => setEntity({ title: c.name, body: [c.role, c.description].filter(Boolean).join(' — ') })}
                        style={{ backgroundColor: t.background, borderWidth: 1, borderColor: t.border, padding: 12, borderRadius: 10, marginBottom: 8 }}
                      >
                        <Text style={{ fontWeight: '600', color: t.text }}>{c.name}</Text>
                        {c.role ? <Text style={{ color: t.textMuted }}>{c.role}</Text> : null}
                      </Pressable>
                    ))}
                  </View>
                ) : null}

                {item.modern.wiki.objects?.length ? (
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Objek</Text>
                    {item.modern.wiki.objects.map((o, i) => (
                      <Pressable
                        key={i}
                        onPress={() => setEntity({ title: o.name, body: o.description })}
                        style={{ backgroundColor: t.background, borderWidth: 1, borderColor: t.border, padding: 12, borderRadius: 10, marginBottom: 8 }}
                      >
                        <Text style={{ fontWeight: '600', color: t.text }}>{o.name}</Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}

                {item.modern.wiki.funFacts?.length ? (
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: t.text }}>Fun Facts</Text>
                    {item.modern.wiki.funFacts.map((f, i) => (
                      <Text key={i} style={{ marginBottom: 6, color: t.text }}>• {f}</Text>
                    ))}
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>

      <Modal visible={!!entity} transparent animationType="fade" onRequestClose={() => setEntity(null)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setEntity(null)}>
          <View style={{ marginTop: 'auto', backgroundColor: t.background, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 }}>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <View style={{ width: 48, height: 4, backgroundColor: t.border, borderRadius: 2 }} />
            </View>
            {entity && (
              <View>
                <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 6, color: t.text }}>{entity.title}</Text>
                {entity.body ? <Text style={{ color: t.text }}>{entity.body}</Text> : null}
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
