import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const filters = [
  { label: 'Tous', icon: 'chatbubbles-outline' },
  { label: 'Calendrier', icon: 'calendar-outline' },
];

const messages = [
  {
    name: 'Sophie Moreau',
    preview: 'Merci pour le dessin ! Je l’adore…',
    time: '09:42',
    unread: 2,
    online: true,
  },
  {
    name: 'Amina Diallo',
    preview: 'Dessin envoyé — en attente de p…',
    time: '09:42',
    unread: 1,
    online: true,
  },
  {
    name: 'Amina Diallo',
    preview: 'Dessin envoyé — en attente de p…',
    time: 'Hier',
    unread: 0,
    online: false,
  },
  {
    name: 'Marc Dubois',
    preview: 'Dessin envoyé — en attente de p…',
    time: 'Lun',
    unread: 0,
    online: false,
  },
  {
    name: 'Clara Petit',
    preview: 'Dessin envoyé — en attente de p…',
    time: 'Mar',
    unread: 0,
    online: true,
  },
  {
    name: 'Amina Diallo',
    preview: 'Dessin envoyé — en attente de p…',
    time: '1s',
    unread: 0,
    online: false,
  },
  {
    name: 'Marc Dubois',
    preview: 'Dessin envoyé — en attente de p…',
    time: '2s',
    unread: 0,
    online: false,
  },
  {
    name: 'Clara Petit',
    preview: 'Dessin envoyé — en attente de p…',
    time: '2s',
    unread: 0,
    online: true,
  },
];

export default function Messages() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace('/(tabs)/profile' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Messagerie</Text>
          <View style={styles.headerIcon} />
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter) => (
            <TouchableOpacity key={filter.label} style={styles.filterChip}>
              <Ionicons name={filter.icon as keyof typeof Ionicons.glyphMap} size={16} color={GuestColors.text} />
              <Text style={styles.filterText}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={GuestColors.muted} />
          <TextInput
            placeholder="Rechercher un patient..."
            placeholderTextColor={GuestColors.muted}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Message</Text>

        <View style={styles.list}>
          {messages.map((message, index) => (
            <TouchableOpacity
              key={`${message.name}-${index}`}
              style={styles.messageCard}
              onPress={() => router.push('/(tabs)/messages/chat' as any)}
            >
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={18} color={GuestColors.text} />
                </View>
                {message.online ? <View style={styles.onlineDot} /> : null}
              </View>
              <View style={styles.messageInfo}>
                <Text style={styles.messageName}>{message.name}</Text>
                <Text style={styles.messagePreview}>{message.preview}</Text>
              </View>
              <View style={styles.messageMeta}>
                <Text style={styles.messageTime}>{message.time}</Text>
                {message.unread ? (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{message.unread}</Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
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
  title: {
    fontSize: 20,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  filterRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
  },
  filterChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  filterText: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  searchBar: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: GuestColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: GuestColors.surface,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  list: {
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    overflow: 'hidden',
  },
  messageCard: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: GuestColors.softBorder,
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
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
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#28C76F',
    borderWidth: 2,
    borderColor: GuestColors.surface,
  },
  messageInfo: {
    flex: 1,
  },
  messageName: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  messagePreview: {
    marginTop: 2,
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  messageMeta: {
    alignItems: 'flex-end',
    gap: 6,
  },
  messageTime: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  unreadBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#6936C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: Fonts.serif,
  },
});
