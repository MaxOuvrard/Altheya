import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const items = [
  { id: '1', name: 'Crème Cicaplast B5', brand: 'La Roche-Posay', price: '34,99€' },
  { id: '2', name: 'Crème Cicaplast B5', brand: 'La Roche-Posay', price: '34,99€' },
  { id: '3', name: 'Crème Cicaplast B5', brand: 'La Roche-Posay', price: '34,99€' },
];

export default function Cart() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mon panier</Text>
          <Text style={styles.headerText}>3 articles</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Articles</Text>
          <View style={styles.list}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemBrand}>{item.brand}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <View style={styles.qtyControls}>
                  <TouchableOpacity style={styles.qtyButton}>
                    <Ionicons name="remove" size={12} color={GuestColors.text} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>1</Text>
                  <TouchableOpacity style={styles.qtyButton}>
                    <Ionicons name="add" size={12} color={GuestColors.text} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Code promo</Text>
          <View style={styles.promoRow}>
            <TextInput
              placeholder="Code promo"
              placeholderTextColor={GuestColors.muted}
              style={styles.promoInput}
            />
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total</Text>
            <Text style={styles.totalValue}>104,97€</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Livraison</Text>
            <Text style={styles.totalValue}>Gratuite</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA</Text>
            <Text style={styles.totalValue}>20%</Text>
          </View>
          <View style={styles.totalRowStrong}>
            <Text style={styles.totalLabelStrong}>Total estimé</Text>
            <Text style={styles.totalValueStrong}>60,60€</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(tabs)/shop' as any)}>
          <Ionicons name="arrow-back" size={16} color={GuestColors.text} />
          <Text style={styles.secondaryButtonText}>Continuer mes achats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Choisir la livraison</Text>
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
  headerText: {
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 14,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  list: {
    marginTop: 12,
    gap: 12,
  },
  itemCard: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: GuestColors.softBorder,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  itemBrand: {
    marginTop: 2,
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  itemPrice: {
    marginTop: 6,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GuestColors.surface,
  },
  qtyText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  promoRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: GuestColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: GuestColors.text,
    backgroundColor: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  promoButton: {
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: GuestColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoButtonText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  totalRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  totalValue: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  totalRowStrong: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabelStrong: {
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  totalValueStrong: {
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  secondaryButton: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GuestColors.surface,
  },
  secondaryButtonText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: GuestColors.text,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 13,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
});
