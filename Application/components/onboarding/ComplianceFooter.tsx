import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingColors } from '@/constants/onboarding';
import { Fonts } from '@/constants/theme';

export default function ComplianceFooter() {
  return (
    <View style={styles.container}>
      <Ionicons name="shield-checkmark-outline" size={14} color={OnboardingColors.icon} />
      <Text style={styles.text}>Conforme RGPD • Sécurité médicale</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
});
