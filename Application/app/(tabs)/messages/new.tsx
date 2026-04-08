import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

export default function NewMessage() {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ returnTo?: string; recipient?: string }>();
  const returnTo = typeof params.returnTo === 'string' ? params.returnTo : undefined;
  const recipient = typeof params.recipient === 'string' ? params.recipient : undefined;

  const handleBack = () => {
    if (returnTo) {
      router.replace(returnTo as any);
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace('/(tabs)/profile' as any);
    }
  };

  const handleSend = () => {
    router.push({
      pathname: '/(tabs)/messages/chat',
      params: { returnTo },
    } as any);
  };

  const recipientName = recipient ?? 'Dr. Maria Santos';

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 10 : 0}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={handleBack}>
              <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nouveau message</Text>
            <View style={styles.headerIcon} />
          </View>

          <View style={styles.recipientCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={18} color={GuestColors.text} />
            </View>
            <View style={styles.recipientInfo}
            >
              <Text style={styles.recipientLabel}>A</Text>
              <Text style={styles.recipientName}>{recipientName}</Text>
              <Text style={styles.recipientRole}>Spécialiste tatouage médical</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Votre message</Text>
          <View style={styles.inputCard}>
            <TextInput
              placeholder="Écrire un message..."
              placeholderTextColor={GuestColors.muted}
              style={styles.messageInput}
              multiline
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={16} color={GuestColors.surface} />
            <Text style={styles.sendText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  recipientCard: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 13,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
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
  recipientInfo: {
    flex: 1,
  },
  recipientLabel: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  recipientName: {
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  recipientRole: {
    marginTop: 2,
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  inputCard: {
    marginTop: 10,
    padding: 12,
    minHeight: 140,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  messageInput: {
    flex: 1,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sendButton: {
    backgroundColor: GuestColors.text,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  sendText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
});
