import { SafeAreaView, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Settings</Text>
        <Text style={{ color: '#666', marginTop: 8 }}>Basic settings placeholder.</Text>
      </View>
    </SafeAreaView>
  );
}

