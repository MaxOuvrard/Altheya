import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingColors } from '@/constants/onboarding';
import { Fonts } from '@/constants/theme';

const options = [
  {
    title: 'Retrouver une symetrie',
    description: 'Corriger une zone et harmoniser la peau',
    icon: 'resize-outline',
  },
  {
    title: 'Clarifier un diagnostic',
    description: 'Etre oriente vers le bon specialiste',
    icon: 'search-outline',
  },
  {
    title: 'Preparer un projet',
    description: 'Planifier une consultation et un devis',
    icon: 'calendar-outline',
  },
  {
    title: 'Explorer les options',
    description: 'Comparer les techniques et resultats',
    icon: 'layers-outline',
  },
];

export default function Goal() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={OnboardingColors.text} />
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <Text style={styles.stepText}>2 sur 2</Text>
        </View>

        <Text style={styles.title}>Quel est votre objectif ?</Text>
        <Text style={styles.subtitle}>Nous vous orientons vers le bon spécialiste</Text>

        <View style={styles.options}>
          {options.map((option, index) => {
            const isSelected = selected === index;
            return (
              <TouchableOpacity
                key={option.title}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelected(index)}
              >
                <View style={styles.optionIcon}>
                  <Ionicons
                    name={option.icon as keyof typeof Ionicons.glyphMap}
                    size={18}
                    color={OnboardingColors.icon}
                  />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={completeOnboarding}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  header: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: OnboardingColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OnboardingColors.surface,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    borderRadius: 999,
    backgroundColor: OnboardingColors.softBorder,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: OnboardingColors.text,
  },
  stepText: {
    fontSize: 12,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
  title: {
    marginTop: 22,
    fontSize: 22,
    color: OnboardingColors.text,
    fontFamily: Fonts.serif,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
  options: {
    marginTop: 20,
    gap: 14,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: OnboardingColors.border,
    backgroundColor: OnboardingColors.surface,
  },
  optionCardSelected: {
    borderColor: OnboardingColors.text,
    backgroundColor: '#F5F2ED',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0ECE6',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    color: OnboardingColors.text,
    fontFamily: Fonts.serif,
  },
  optionDescription: {
    marginTop: 4,
    fontSize: 12,
    color: OnboardingColors.muted,
    fontFamily: Fonts.serif,
  },
  primaryButton: {
    marginTop: 22,
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
});
