import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BrandMark from '@/components/onboarding/BrandMark';
import ComplianceFooter from '@/components/onboarding/ComplianceFooter';
import { OnboardingColors } from '@/constants/onboarding';
import { Fonts } from '@/constants/theme';

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.brandBlock}>
            <BrandMark size={84} />
            <Text style={styles.brandName}>Bloomink</Text>
          </View>

          <View style={styles.segmented}>
            <TouchableOpacity style={[styles.segment, styles.segmentActive]}>
              <Text style={[styles.segmentText, styles.segmentTextActive]}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.segment} onPress={() => router.push('/(onboarding)/signup' as any)}>
              <Text style={styles.segmentText}>Créer un compte</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Adresse e-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="votre@mail.com"
                placeholderTextColor={OnboardingColors.placeholder}
                keyboardType="email-address"
              />
            </View>

            <View>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor={OnboardingColors.placeholder}
                secureTextEntry
              />
              <TouchableOpacity style={styles.forgotWrap}>
                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou continuer avec</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Google</Text>
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
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  main: {
    paddingTop: 6,
  },
  brandBlock: {
    alignItems: 'center',
    marginTop: 24,
  },
  brandName: {
    marginTop: 12,
    fontSize: 22,
    color: OnboardingColors.text,
    fontFamily: Fonts.serif,
  },
  segmented: {
    marginTop: 22,
    flexDirection: 'row',
    backgroundColor: OnboardingColors.softBorder,
    borderRadius: 999,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: OnboardingColors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
  segmentTextActive: {
    color: OnboardingColors.text,
  },
  form: {
    marginTop: 22,
    gap: 14,
  },
  label: {
    fontSize: 13,
    color: OnboardingColors.muted,
    marginBottom: 6,
    fontFamily: Fonts.serif,
  },
  input: {
    borderWidth: 1,
    borderColor: OnboardingColors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: OnboardingColors.text,
    backgroundColor: OnboardingColors.surface,
    fontFamily: Fonts.serif,
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    fontSize: 12,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
  dividerRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: OnboardingColors.border,
  },
  dividerText: {
    fontSize: 12,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
  googleButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: OnboardingColors.border,
    alignItems: 'center',
    backgroundColor: OnboardingColors.surface,
  },
  googleText: {
    fontSize: 15,
    color: OnboardingColors.text,
    fontFamily: Fonts.serif,
  },
});
