import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const settings = [
  { icon: 'chatbubbles-outline', label: 'Messagerie', route: '/(tabs)/messages' },
  { icon: 'person-outline', label: 'Informations personnelles' },
  { icon: 'shield-checkmark-outline', label: 'Confidentialité et sécurité' },
  { icon: 'chatbubble-ellipses-outline', label: 'Support Bloomink' },
  { icon: 'document-text-outline', label: 'Conditions et politique' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profil</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={GuestColors.text} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Invité</Text>
            <Text style={styles.subtitle}>Créez un compte pour sauvegarder vos projets.</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(onboarding)/login' as any)}>
            <Text style={styles.primaryButtonText}>Connexion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.list}>
            {settings.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.listItem}
                onPress={() => (item.route ? router.push(item.route as any) : null)}
              >
                <View style={styles.listIcon}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={16} color={GuestColors.text} />
                </View>
                <Text style={styles.listText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={GuestColors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.noteCard}>
          <Ionicons name="lock-closed" size={16} color={GuestColors.muted} />
          <Text style={styles.noteText}>Vos données sont protégées selon les standards RGPD.</Text>
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
  profileCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    gap: 4,
  },
  name: {
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  subtitle: {
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: GuestColors.text,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 14,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  list: {
    marginTop: 12,
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  listIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    flex: 1,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  noteCard: {
    marginTop: 18,
    padding: 12,
    borderRadius: 14,
    backgroundColor: GuestColors.chip,
    borderWidth: 1,
    borderColor: GuestColors.softBorder,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
    flex: 1,
  },
});
