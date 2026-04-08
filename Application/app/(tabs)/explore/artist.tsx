import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const specialities = [
  'Couverture cicatrices',
  'Reconstruction médicale',
  'Réhabilitation brûlures',
  'Pigmentation aréoles',
];

const portfolio = ['Avant', 'Après', 'Détail', 'Résultat', 'Texture', 'Correction'];

export default function ArtistDetail() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace('/(tabs)/explore' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Découvrir</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="heart-outline" size={18} color={GuestColors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={20} color={GuestColors.muted} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Dr. Maria Santos</Text>
              <Text style={styles.profileRole}>Spécialiste tatouage médical</Text>
              <View style={styles.profileMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="medal-outline" size={14} color={GuestColors.muted} />
                  <Text style={styles.metaText}>Certifié médical</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="star" size={14} color={GuestColors.alert} />
                  <Text style={styles.metaText}>4.9 (127 avis)</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>8 ans</Text>
              <Text style={styles.statLabel}>Expérience</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Note</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Avis</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/messages/new',
                params: {
                  returnTo: '/(tabs)/explore/artist',
                  recipient: 'Dr. Maria Santos',
                },
              } as any)
            }
          >
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spécialisations</Text>
          <View style={styles.tagRow}>
            {specialities.map((item) => (
              <View key={item} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <View style={styles.grid}>
            {portfolio.map((label) => (
              <View key={label} style={styles.gridItem}>
                <View style={styles.placeholderFrame}>
                  <View style={styles.placeholderDot} />
                  <View style={styles.placeholderLine} />
                  <View style={[styles.placeholderLine, styles.placeholderLineShort]} />
                </View>
                <Text style={styles.gridLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommandations de cet artiste</Text>
          <View style={styles.recoCard}>
            <View style={styles.recoImage} />
            <View style={styles.recoContent}>
              <Text style={styles.recoTitle}>Crème Cicaplast B5</Text>
              <Text style={styles.recoSubtitle}>La Roche-Posay</Text>
              <Text style={styles.recoPrice}>34,99€</Text>
            </View>
          </View>
          <View style={styles.recoCard}>
            <View style={styles.recoImage} />
            <View style={styles.recoContent}>
              <Text style={styles.recoTitle}>Crème Cicaplast B5</Text>
              <Text style={styles.recoSubtitle}>La Roche-Posay</Text>
              <Text style={styles.recoPrice}>34,99€</Text>
            </View>
          </View>
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
  header: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GuestColors.surface,
  },
  headerTitle: {
    fontSize: 15,
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
  },
  profileTop: {
    flexDirection: 'row',
    gap: 12,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  profileRole: {
    marginTop: 4,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  profileMeta: {
    marginTop: 10,
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  statsRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  statLabel: {
    marginTop: 2,
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  messageButton: {
    marginTop: 14,
    backgroundColor: GuestColors.text,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 13,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  tagRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: GuestColors.softBorder,
  },
  tagText: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  grid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '30.5%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: GuestColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: GuestColors.border,
  },
  placeholderFrame: {
    width: '78%',
    aspectRatio: 1.1,
    borderRadius: 10,
    backgroundColor: GuestColors.softBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E7DFD4',
  },
  placeholderDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D7CFC4',
  },
  placeholderLine: {
    width: '60%',
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D7CFC4',
  },
  placeholderLineShort: {
    width: '40%',
  },
  gridLabel: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  recoCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  recoImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: GuestColors.softBorder,
  },
  recoContent: {
    flex: 1,
  },
  recoTitle: {
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  recoSubtitle: {
    marginTop: 2,
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  recoPrice: {
    marginTop: 6,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
});
