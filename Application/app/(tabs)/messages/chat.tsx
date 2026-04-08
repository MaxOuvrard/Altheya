import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

const messages = [
  { id: '1', side: 'left', text: 'aujenjjsn ennc . czex cjz c' },
  { id: '2', side: 'right', text: 'aujenjjsn ennc . czex cjz c' },
  { id: '3', side: 'left', text: 'aujenjjsn ennc . czex cjz c' },
  { id: '4', side: 'center', text: '14:30' },
  { id: '5', side: 'right', text: 'aujenjjsn ennc . czex cjz c' },
];

export default function Chat() {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ returnTo?: string }>();
  const returnTo = typeof params.returnTo === 'string' ? params.returnTo : undefined;

  const handleBack = () => {
    if (returnTo) {
      router.replace(returnTo as any);
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace('/(tabs)/messages' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 10 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color={GuestColors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messagerie</Text>
          <View style={styles.headerIcon} />
        </View>

        <View style={styles.appointmentCard}>
          <Ionicons name="calendar-outline" size={16} color={GuestColors.muted} />
          <Text style={styles.appointmentText}>RDV : Ven. 7 avril · 11h00 · Couverture cicatrice · 160 €</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Voir</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.timeStamp}>Aujourd'hui 10:20</Text>

          {messages.map((message) => {
            if (message.side === 'center') {
              return (
                <Text key={message.id} style={styles.timeStamp}>
                  {message.text}
                </Text>
              );
            }

            const isLeft = message.side === 'left';
            return (
              <View key={message.id} style={[styles.bubbleRow, !isLeft && styles.bubbleRowRight]}>
                {isLeft ? (
                  <View style={styles.bubbleAvatar}>
                    <Ionicons name="person" size={14} color={GuestColors.text} />
                  </View>
                ) : null}
                <View style={[styles.bubble, !isLeft && styles.bubbleRight]}>
                  <Text style={[styles.bubbleText, !isLeft && styles.bubbleTextRight]}>{message.text}</Text>
                </View>
              </View>
            );
          })}

          <View style={styles.lockedCard}>
            <Ionicons name="lock-closed" size={18} color="#7A4FC8" />
            <Text style={styles.lockedTitle}>Dessin verrouillé</Text>
            <Text style={styles.lockedSubtitle}>Déverrouillez pour voir en HD</Text>
          </View>

          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <Ionicons name="brush-outline" size={16} color="#7A4FC8" />
              <Text style={styles.paymentTitle}>Couverture épaule droite — v2</Text>
            </View>
            <Text style={styles.paymentText}>
              Version finale incluant les retouches demandées. Motif botanique tons chauds.
            </Text>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Accès HD</Text>
              <Text style={styles.paymentPrice}>40,00 €</Text>
            </View>
            <TouchableOpacity style={styles.paymentButton}>
              <Ionicons name="card-outline" size={16} color={GuestColors.surface} />
              <Text style={styles.paymentButtonText}>Débloquer — 40,00 €</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.bubbleRow, styles.bubbleRowRight]}>
            <View style={[styles.bubble, styles.bubbleRight]}>
              <Text style={[styles.bubbleText, styles.bubbleTextRight]}>aujenjjsn ennc . czex cjz c</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput placeholder="Écrire un message..." placeholderTextColor={GuestColors.muted} style={styles.input} />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={16} color={GuestColors.surface} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#EFF1F1',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  appointmentCard: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentText: {
    flex: 1,
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  linkText: {
    fontSize: 11,
    color: '#7A4FC8',
    fontFamily: Fonts.serif,
  },
  chatContent: {
    paddingVertical: 16,
    paddingBottom: 24,
    gap: 12,
  },
  timeStamp: {
    alignSelf: 'center',
    fontSize: 11,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleRowRight: {
    justifyContent: 'flex-end',
  },
  bubbleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '72%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#1B1B1B',
  },
  bubbleRight: {
    backgroundColor: GuestColors.surface,
    borderWidth: 1,
    borderColor: GuestColors.border,
  },
  bubbleText: {
    fontSize: 12,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  bubbleTextRight: {
    color: GuestColors.text,
  },
  lockedCard: {
    marginTop: 8,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#D8C5EA',
    borderWidth: 1,
    borderColor: '#B89AE3',
    alignItems: 'center',
    gap: 6,
    borderStyle: 'dashed',
  },
  lockedTitle: {
    fontSize: 12,
    color: '#5B2E8F',
    fontFamily: Fonts.serif,
  },
  lockedSubtitle: {
    fontSize: 10,
    color: '#5B2E8F',
    fontFamily: Fonts.serif,
  },
  paymentCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#B89AE3',
    backgroundColor: GuestColors.surface,
    gap: 8,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentTitle: {
    fontSize: 12,
    color: '#5B2E8F',
    fontFamily: Fonts.serif,
  },
  paymentText: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentLabel: {
    fontSize: 10,
    color: GuestColors.muted,
    fontFamily: Fonts.serif,
  },
  paymentPrice: {
    fontSize: 11,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  paymentButton: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1B1B1B',
    paddingVertical: 10,
    borderRadius: 10,
  },
  paymentButtonText: {
    fontSize: 11,
    color: GuestColors.surface,
    fontFamily: Fonts.serif,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GuestColors.border,
    backgroundColor: GuestColors.surface,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: GuestColors.text,
    fontFamily: Fonts.serif,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: GuestColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
