import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';
import { OnboardingColors } from '@/constants/onboarding';

export default function OnboardingLayout() {
  return (
    <View style={styles.wrapper}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: OnboardingColors.background,
  },
});
