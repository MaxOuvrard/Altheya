import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const categories = ['Tous', 'Cicatrices', 'Brûlures', 'Médical'];
const products = Array.from({ length: 6 }).map((_, index) => ({
  id: `product-${index}`,
  name: 'Crème Cicaplast B5',
  brand: 'La Roche-Posay',
  price: '34,99€',
}));

export default function ShopIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Boutique</Text>
          <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/(tabs)/shop/cart' as any)}>
            <Ionicons name="cart-outline" size={18} color={GuestColors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={GuestColors.muted} />
          <TextInput
            placeholder="Rechercher un produit..."
            placeholderTextColor={GuestColors.muted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.recoCard}>
          <View style={styles.recoHeader}>
            <View style={styles.recoDot} />
            <Text style={styles.recoTitle}>Recommandations personnalisées</Text>
          </View>
          <Text style={styles.recoText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tellus.
          </Text>
          <View style={styles.recoGrid}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={`reco-${index}`} style={styles.recoImage} />
            ))}
          </View>
        </View>

        <View style={styles.categoryRow}>
          {categories.map((category, index) => (
            <TouchableOpacity key={category} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits adaptés à votre profil</Text>
          <View style={styles.productGrid}>
            {products.slice(0, 4).map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => router.push('/(tabs)/shop/product' as any)}
              >
                <View style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <View style={styles.addButton}>
                    <Ionicons name="add" size={14} color={GuestColors.surface} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits qui peuvent vous intéresser</Text>
          <View style={styles.productGrid}>
            {products.slice(2).map((product) => (
              <TouchableOpacity
                key={`${product.id}-alt`}
                style={styles.productCard}
                onPress={() => router.push('/(tabs)/shop/product' as any)}
              >
                <View style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <View style={styles.addButton}>
                    <Ionicons name="add" size={14} color={GuestColors.surface} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  title: {
    fontSize: 20,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  cartButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GuestColors.surface,
  },
  searchBar: {
    marginTop: 16,
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
  recoCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
  },
  recoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C87B6D',
  },
  recoTitle: {
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  recoText: {
    marginTop: 8,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  recoGrid: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  recoImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: GuestColors.softBorder,
  },
  categoryRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: GuestColors.chip,
  },
  chipActive: {
    backgroundColor: GuestColors.text,
  },
  chipText: {
    fontSize: 11,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  chipTextActive: {
    color: GuestColors.surface,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  productGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: '47%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: GuestColors.softBorder,
  },
  productName: {
    marginTop: 10,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  productBrand: {
    marginTop: 2,
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  productFooter: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: GuestColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
