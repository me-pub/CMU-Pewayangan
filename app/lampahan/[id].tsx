import { useLocalSearchParams, Stack } from 'expo-router';
import { ScrollView, SafeAreaView, Text, View } from 'react-native';
import { getLampahanById } from '../../src/lib/storage';
import { useAppStore } from '../../src/state/store';

export default function LampahanDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mode = useAppStore((s) => s.mode);
  const item = id ? getLampahanById(id) : undefined;

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#111' }}>Not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen options={{ title: item.title }} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {mode === 'authentic' ? (
          <View>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#111' }}>Sinopsis</Text>
            <Text style={{ marginBottom: 16, color: '#111' }}>{item.authentic.sinopsis}</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#111' }}>Cerita</Text>
            <Text style={{ marginBottom: 16, color: '#111' }}>{item.authentic.full_cerita}</Text>
            {item.authentic.catatan_budaya?.length ? (
              <View>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#111' }}>Catatan Budaya</Text>
                {item.authentic.catatan_budaya.map((c, idx) => (
                  <Text key={idx} style={{ marginBottom: 8, color: '#111' }}>• {c}</Text>
                ))}
              </View>
            ) : null}
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#111' }}>Sinopsis</Text>
            <Text style={{ marginBottom: 16, color: '#111' }}>{item.authentic.sinopsis}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
