import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

export default function ExploreMap() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carte</Text>
          <View style={styles.headerIcon} />
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={GuestColors.muted} />
          <TextInput
            placeholder="Rechercher un lieu..."
            placeholderTextColor={GuestColors.muted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={28} color={GuestColors.icon} />
          <Text style={styles.mapText}>Carte interactive</Text>
          <Text style={styles.mapSubtext}>Aperçu des artistes autour de vous</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: GuestColors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 90,
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
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  searchBar: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: GuestColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: GuestColors.surface,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  mapPlaceholder: {
    marginTop: 18,
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  mapText: {
    fontSize: 15,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  mapSubtext: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
});
