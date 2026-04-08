import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const categories = ['Tous', 'Couvertures', 'Brûlures', 'Médical'];
const artists = [
  {
    name: 'Alex Thompson',
    role: 'Artiste médical certifié',
    distance: '12 km',
    rating: '4.8',
    reviews: '127 avis',
  },
  {
    name: 'Alex Thompson',
    role: 'Artiste médical certifié',
    distance: '8 km',
    rating: '4.9',
    reviews: '96 avis',
  },
  {
    name: 'Alex Thompson',
    role: 'Artiste médical certifié',
    distance: '14 km',
    rating: '4.7',
    reviews: '83 avis',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.stickyHeader}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color={GuestColors.text} />
              </View>
              <View>
                <Text style={styles.welcome}>Bienvenue,</Text>
                <Text style={styles.name}>Tommy</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={20} color={GuestColors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryCard}>
          <View style={styles.primaryCardRow}>
            <View style={styles.primaryIcon}>
              <Ionicons name="add" size={18} color={GuestColors.surface} />
            </View>
            <Text style={styles.primaryCardText}>Démarrer mon projet</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={GuestColors.surface} />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trouvez l'artiste fait pour vous</Text>
          <Text style={styles.sectionSubtitle}>Des profils certifiés en tatouage thérapeutique</Text>
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(tabs)/explore' as any)}>
            <Ionicons name="search" size={18} color={GuestColors.muted} />
            <Text style={styles.searchText}>Découvrir les artistes</Text>
          </TouchableOpacity>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>320+</Text>
              <Text style={styles.statLabel}>Artistes certifiés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Notes moyennes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Satisfaction client</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Parcourir par catégorie</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/explore' as any)}>
              <Text style={styles.linkText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chipRow}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={[styles.chip, index === 0 && styles.chipActive]}
              >
                <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Artistes en vedette</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/explore' as any)}>
              <Text style={styles.linkText}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {artists.map((artist) => (
            <View key={`${artist.name}-${artist.distance}`} style={styles.artistCard}>
              <View style={styles.artistLeft}>
                <View style={styles.artistAvatar}>
                  <Ionicons name="person" size={18} color={GuestColors.muted} />
                </View>
                <View>
                  <Text style={styles.artistName}>{artist.name}</Text>
                  <Text style={styles.artistRole}>{artist.role}</Text>
                  <View style={styles.artistMeta}>
                    <Ionicons name="star" size={12} color={GuestColors.alert} />
                    <Text style={styles.artistMetaText}>{artist.rating}</Text>
                    <Text style={styles.artistMetaText}>• {artist.reviews}</Text>
                    <Text style={styles.artistMetaText}>• {artist.distance}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.artistButton}
                onPress={() => router.push('/(tabs)/explore/artist' as any)}
              >
                <Text style={styles.artistButtonText}>Voir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.packCard}>
          <Text style={styles.packTitle}>Pack Santé Bloomink</Text>
          <Text style={styles.packSubtitle}>Votre suivi médicalisé, inclus</Text>
          <View style={styles.packList}>
            {[
              'Avis médicaux certifiés',
              'Messagerie privée de bout en bout',
              'Documents médicaux protégés (RGPD)',
              'Remboursement garanti si annulation',
            ].map((item) => (
              <View key={item} style={styles.packItem}>
                <Ionicons name="checkmark-circle" size={16} color={GuestColors.success} />
                <Text style={styles.packItemText}>{item}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.packButton}>
            <Text style={styles.packButtonText}>En savoir plus sur la protection</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.insuranceCard}>
          <Text style={styles.sectionTitle}>Assurance séances</Text>
          <Text style={styles.sectionSubtitle}>Chaque séance est couverte par notre garantie partenaire</Text>
          <View style={styles.insuranceRow}>
            <View style={styles.insuranceItem}>
              <Ionicons name="shield-checkmark" size={16} color={GuestColors.success} />
              <Text style={styles.insuranceText}>Annulation gratuite</Text>
            </View>
            <View style={styles.insuranceItem}>
              <Ionicons name="cash" size={16} color={GuestColors.success} />
              <Text style={styles.insuranceText}>Remboursement sous 72h</Text>
            </View>
          </View>
          <View style={styles.insuranceRow}>
            <View style={styles.insuranceItem}>
              <Ionicons name="card" size={16} color={GuestColors.success} />
              <Text style={styles.insuranceText}>Paiement sécurisé</Text>
            </View>
            <View style={styles.insuranceItem}>
              <Ionicons name="help-circle" size={16} color={GuestColors.success} />
              <Text style={styles.insuranceText}>Support 7j/7</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerCard}>
          <Ionicons name="lock-closed" size={16} color={GuestColors.muted} />
          <Text style={styles.footerText}>Vos données sont protégées selon le Règlement Général RGPD.</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stickyHeader: {
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: GuestColors.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GuestColors.surface,
  },
  welcome: {
    fontSize: 13,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  name: {
    fontSize: 18,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GuestColors.surface,
  },
  primaryCard: {
    marginTop: 18,
    backgroundColor: GuestColors.text,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  primaryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryCardText: {
    color: GuestColors.surface,
    fontSize: 15,
    fontFamily: Fonts.serif,
  },
  section: {
    marginTop: 22,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  sectionSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  searchBar: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: GuestColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: GuestColors.surface,
  },
  searchText: {
    fontSize: 14,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  statsRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.softBorder,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  linkText: {
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  chipRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: GuestColors.chip,
  },
  chipActive: {
    backgroundColor: GuestColors.text,
  },
  chipText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  chipTextActive: {
    color: GuestColors.surface,
  },
  artistCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artistLeft: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  artistAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 14,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  artistRole: {
    marginTop: 2,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  artistMeta: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  artistMetaText: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  artistButton: {
    backgroundColor: GuestColors.text,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  artistButtonText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  packCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 18,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
  },
  packTitle: {
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  packSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  packList: {
    marginTop: 12,
    gap: 10,
  },
  packItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  packItemText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
    flex: 1,
  },
  packButton: {
    marginTop: 14,
    backgroundColor: GuestColors.text,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  packButtonText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  insuranceCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 18,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
  },
  insuranceRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insuranceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  insuranceText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  footerCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    backgroundColor: GuestColors.chip,
    borderWidth: 1,
    borderColor: GuestColors.softBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
    flex: 1,
  },
});
