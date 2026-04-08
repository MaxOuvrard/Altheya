import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BrandMark from '@/components/onboarding/BrandMark';
import ComplianceFooter from '@/components/onboarding/ComplianceFooter';
import { OnboardingColors } from '@/constants/onboarding';
import { Fonts } from '@/constants/theme';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <BrandMark size={92} />
          <Text style={styles.title}>Bloomink</Text>
          <Text style={styles.description}>
            Connectez-vous avec des artistes tatoueurs certifiés, spécialisés en tatouage thérapeutique
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(onboarding)/login' as any)}>
            <Text style={styles.primaryButtonText}>Commencer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(onboarding)/reason' as any)}
          >
            <Text style={styles.secondaryButtonText}>Continuer en tant qu'invité</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(onboarding)/login' as any)}>
            <Text style={styles.secondaryButtonText}>Zone artiste</Text>
          </TouchableOpacity>
        </View>

        <ComplianceFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: OnboardingColors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  hero: {
    alignItems: 'center',
    marginTop: 36,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    color: OnboardingColors.text,
    fontFamily: Fonts.serif,
  },
  description: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: OnboardingColors.muted,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: Fonts.serif,
  },
  actions: {
    gap: 12,
    marginTop: 40,
  },
  primaryButton: {
    backgroundColor: OnboardingColors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: Fonts.serif,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: OnboardingColors.border,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 15,
    color: OnboardingColors.text,
    fontFamily: Fonts.serif,
  },
});
