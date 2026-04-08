import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const filters = ['Tous', 'Cicatrices', 'Brûlures', 'Médical'];
const posts = [
  {
    id: 'post-1',
    title: 'Tatouage botanique',
    artist: 'Dr. Maria Santos',
    specialty: 'Couverture cicatrice',
    location: 'Paris',
    likes: '124',
  },
  {
    id: 'post-2',
    title: 'Texture naturelle',
    artist: 'Clara Petit',
    specialty: 'Dermographie réparatrice',
    location: 'Lyon',
    likes: '98',
  },
  {
    id: 'post-3',
    title: 'Reconstruction douce',
    artist: 'Alex Thompson',
    specialty: 'Reconstruction médicale',
    location: 'Bordeaux',
    likes: '156',
  },
];
const artists = [
  {
    name: 'Alex Thompson',
    role: 'Artiste médical certifié',
    distance: '12 km',
    rating: '4.8',
    reviews: '127 avis',
    tags: ['Cicatrices', 'Brûlures'],
  },
  {
    name: 'Jean D.',
    role: 'Artiste thérapeutique',
    distance: '6 km',
    rating: '4.9',
    reviews: '86 avis',
    tags: ['Médical', 'Aréoles'],
  },
  {
    name: 'Louise A.',
    role: 'Dermographie réparatrice',
    distance: '9 km',
    rating: '4.7',
    reviews: '73 avis',
    tags: ['Cicatrices', 'Brûlures'],
  },
  {
    name: 'Cyrian C.',
    role: 'Reconstruction esthétique',
    distance: '15 km',
    rating: '4.8',
    reviews: '101 avis',
    tags: ['Médical', 'Esthétique'],
  },
];

export default function ExploreIndex() {
  const router = useRouter();
  const [mode, setMode] = useState<'photos' | 'artists'>('photos');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Découvrir</Text>
            <Text style={styles.subtitle}>Rechercher un spécialiste</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="options-outline" size={16} color={GuestColors.text} />
              <Text style={styles.headerButtonText}>Filtres</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerButton, styles.headerButtonLight]}
              onPress={() => router.push('/(tabs)/explore/map' as any)}
            >
              <Ionicons name="map-outline" size={16} color={GuestColors.text} />
              <Text style={styles.headerButtonText}>Carte</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={GuestColors.muted} />
          <TextInput
            placeholder="Rechercher artistes, spécialisations..."
            placeholderTextColor={GuestColors.muted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter, index) => (
            <TouchableOpacity key={filter} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.modeSwitcher}>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'artists' && styles.modeButtonActive]}
            onPress={() => setMode('artists')}
          >
            <Ionicons name="people-outline" size={14} color={mode === 'artists' ? GuestColors.surface : GuestColors.text} />
            <Text style={[styles.modeText, mode === 'artists' && styles.modeTextActive]}>Artistes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'photos' && styles.modeButtonActive]}
            onPress={() => setMode('photos')}
          >
            <Ionicons name="images-outline" size={14} color={mode === 'photos' ? GuestColors.surface : GuestColors.text} />
            <Text style={[styles.modeText, mode === 'photos' && styles.modeTextActive]}>Tatouages</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.resultText}>
          {mode === 'photos' ? '24 publications disponibles' : '12 artistes trouvés'}
        </Text>

        {mode === 'photos' ? (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Inspiration</Text>
              <Text style={styles.sectionHint}>Tatouages récents</Text>
            </View>
            <View style={styles.postList}>
              {posts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.postAvatar}>
                      <Ionicons name="person" size={16} color={GuestColors.muted} />
                    </View>
                    <View style={styles.postInfo}>
                      <Text style={styles.postArtist}>{post.artist}</Text>
                      <Text style={styles.postMeta}> {post.specialty} • {post.location}</Text>
                    </View>
                    <TouchableOpacity style={styles.postAction}>
                      <Ionicons name="ellipsis-horizontal" size={16} color={GuestColors.muted} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.postImage}>
                    <View style={styles.postImageAccent} />
                    <View style={styles.postImageLine} />
                    <View style={[styles.postImageLine, styles.postImageLineShort]} />
                  </View>

                  <View style={styles.postFooter}>
                    <View style={styles.postTagRow}>
                      <View style={styles.postTag}>
                        <Text style={styles.postTagText}>{post.title}</Text>
                      </View>
                      <View style={styles.postTagLight}>
                        <Ionicons name="heart" size={12} color={GuestColors.alert} />
                        <Text style={styles.postTagText}>{post.likes}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.postButton}
                      onPress={() => router.push('/(tabs)/explore/artist' as any)}
                    >
                      <Text style={styles.postButtonText}>Voir l'artiste</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Artistes</Text>
              <Text style={styles.sectionHint}>Disponibles près de vous</Text>
            </View>
            <View style={styles.list}>
              {artists.map((artist) => (
                <TouchableOpacity
                  key={artist.name}
                  style={styles.artistCard}
                  onPress={() => router.push('/(tabs)/explore/artist' as any)}
                >
                  <View style={styles.artistTop}>
                    <View style={styles.avatar}>
                      <Ionicons name="person" size={18} color={GuestColors.muted} />
                    </View>
                    <View style={styles.artistInfo}>
                      <Text style={styles.artistName}>{artist.name}</Text>
                      <Text style={styles.artistRole}>{artist.role}</Text>
                      <View style={styles.artistMeta}>
                        <Ionicons name="star" size={12} color={GuestColors.alert} />
                        <Text style={styles.artistMetaText}>{artist.rating}</Text>
                        <Text style={styles.artistMetaText}>• {artist.reviews}</Text>
                        <Text style={styles.artistMetaText}>• {artist.distance}</Text>
                      </View>
                    </View>
                    <View style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>Voir</Text>
                    </View>
                  </View>
                  <View style={styles.tagRow}>
                    {artist.tags.map((tag) => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: GuestColors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: GuestColors.surface,
  },
  headerButtonLight: {
    backgroundColor: GuestColors.chip,
  },
  headerButtonText: {
    fontSize: 11,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
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
  filterRow: {
    marginTop: 12,
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
  resultText: {
    marginTop: 14,
    fontSize: 12,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  modeSwitcher: {
    marginTop: 14,
    flexDirection: 'row',
    backgroundColor: GuestColors.softBorder,
    borderRadius: 999,
    padding: 4,
    gap: 6,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: GuestColors.surface,
  },
  modeButtonActive: {
    backgroundColor: GuestColors.text,
  },
  modeText: {
    fontSize: 11,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  modeTextActive: {
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionHint: {
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  postList: {
    marginTop: 12,
    gap: 14,
  },
  postCard: {
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    gap: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postInfo: {
    flex: 1,
  },
  postArtist: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  postMeta: {
    marginTop: 2,
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  postAction: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1.1,
    borderRadius: 16,
    backgroundColor: GuestColors.softBorder,
    borderWidth: 1,
    borderColor: '#E7DFD4',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  postImageAccent: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D9CDC1',
  },
  postImageLine: {
    width: '60%',
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D9CDC1',
  },
  postImageLineShort: {
    width: '40%',
  },
  postFooter: {
    gap: 10,
  },
  postTagRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  postTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: GuestColors.chip,
  },
  postTagLight: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: GuestColors.softBorder,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  postTagText: {
    fontSize: 10,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  postButton: {
    alignSelf: 'flex-start',
    backgroundColor: GuestColors.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  postButtonText: {
    fontSize: 11,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  list: {
    marginTop: 12,
    gap: 12,
  },
  artistCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  artistTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: GuestColors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: 14,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  artistRole: {
    marginTop: 2,
    fontSize: 11,
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
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  viewButton: {
    backgroundColor: GuestColors.text,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  viewButtonText: {
    fontSize: 11,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  tagRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: GuestColors.softBorder,
  },
  tagText: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
});
