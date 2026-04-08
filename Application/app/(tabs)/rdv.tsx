import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

export default function RdvScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Rendez-vous</Text>

        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons name="calendar" size={20} color={GuestColors.text} />
          </View>
          <Text style={styles.emptyTitle}>Aucun rendez-vous prévu</Text>
          <Text style={styles.emptySubtitle}>
            Explorez les artistes pour planifier votre première consultation.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)/explore' as any)}>
            <Text style={styles.primaryButtonText}>Découvrir les artistes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Prochaines étapes</Text>
          {[
            'Sélectionnez un artiste certifié',
            'Discutez de votre projet en privé',
            'Planifiez une séance de consultation',
          ].map((item) => (
            <View key={item} style={styles.infoRow}>
              <Ionicons name="checkmark-circle" size={14} color={GuestColors.success} />
              <Text style={styles.infoText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: GuestColors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    marginTop: 6,
    fontSize: 20,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  emptyCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  emptySubtitle: {
    fontSize: 12,
    color: GuestColors.muted,
    textAlign: 'center',
    fontFamily: Fonts.serif,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: GuestColors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  infoCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    gap: 10,
  },
  infoTitle: {
    fontSize: 14,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
});
