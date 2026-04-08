import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { isOnboardingComplete } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (isOnboardingComplete) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingComplete, router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={isOnboardingComplete ? '(tabs)' : '(onboarding)'}
      >
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <RootLayoutContent />
    </OnboardingProvider>
  );
}
