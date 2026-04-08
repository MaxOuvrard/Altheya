import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { OnboardingColors } from '@/constants/onboarding';
import { Fonts } from '@/constants/theme';

const options = [
  {
    title: 'Couverture de cicatrices',
    description: 'Masquer les cicatrices chirurgicales ou traumatiques',
    icon: 'bandage-outline',
  },
  {
    title: 'Reconstruction brûlures',
    description: "Restaurer l'apparence de la peau",
    icon: 'flame-outline',
  },
  {
    title: 'Reconstruction médicale',
    description: 'Restauration esthétique post-chirurgie',
    icon: 'medkit-outline',
  },
  {
    title: 'Amélioration esthétique',
    description: 'Embellissement cosmétique',
    icon: 'sparkles-outline',
  },
];

export default function Reason() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={OnboardingColors.text} />
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.stepText}>1 sur 2</Text>
        </View>

        <Text style={styles.title}>Qu'est-ce qui vous amène ?</Text>
        <Text style={styles.subtitle}>Aidez-nous à personnaliser votre expérience</Text>

        <View style={styles.options}>
          {options.map((option, index) => {
            const isSelected = selected === index;
            return (
              <TouchableOpacity
                key={option.title}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => {
                  setSelected(index);
                  router.push('/(onboarding)/goal' as any);
                }}
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
});
