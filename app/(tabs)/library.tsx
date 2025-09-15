import { SafeAreaView, Text, View } from 'react-native';

export default function LibraryScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Saved (local)</Text>
        <Text style={{ color: '#666', marginTop: 8 }}>Coming soon in M2.</Text>
      </View>
    </SafeAreaView>
  );
}

