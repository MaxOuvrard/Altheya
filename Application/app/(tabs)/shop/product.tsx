import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

export default function ProductDetail() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Boutique</Text>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/(tabs)/shop/cart' as any)}>
            <Ionicons name="cart-outline" size={18} color={GuestColors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroImage} />
          <View style={styles.thumbRow}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View key={`thumb-${index}`} style={styles.thumb} />
            ))}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.productName}>Crème Cicaplast B5</Text>
          <Text style={styles.productBrand}>La Roche-Posay</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={GuestColors.alert} />
            <Text style={styles.ratingText}>4.9</Text>
            <Text style={styles.ratingText}>• 214 avis</Text>
          </View>
          <Text style={styles.productPrice}>34,99€</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tellus at
            vulputate viverra. Etiam ac libero lectus.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)/shop/cart' as any)}>
          <Text style={styles.primaryButtonText}>Ajouter au panier</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  heroCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: 16,
    backgroundColor: GuestColors.softBorder,
  },
  thumbRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  thumb: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: GuestColors.softBorder,
  },
  infoCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  productName: {
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  productBrand: {
    marginTop: 4,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  ratingRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  productPrice: {
    marginTop: 10,
    fontSize: 16,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    color: GuestColors.muted,
    lineHeight: 18,
    fontFamily: Fonts.serif,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: GuestColors.text,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
});
