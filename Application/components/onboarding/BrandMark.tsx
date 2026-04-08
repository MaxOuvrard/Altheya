import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { OnboardingColors } from '@/constants/onboarding';

type BrandMarkProps = {
  size?: number;
};

export default function BrandMark({ size = 84 }: BrandMarkProps) {
  const iconSize = Math.round(size * 0.3);

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <FontAwesome name="heart" size={iconSize} color="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: OnboardingColors.icon,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
