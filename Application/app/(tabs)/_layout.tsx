import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GuestColors } from '@/constants/guest';
import { Fonts } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: GuestColors.background,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          backgroundColor: GuestColors.surface,
          borderTopWidth: 0,
          height: 70,
          marginHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 8,
          paddingHorizontal: 10,
          borderRadius: 80,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6,
        },
        tabBarActiveTintColor: GuestColors.text,
        tabBarInactiveTintColor: GuestColors.muted,
        tabBarLabelStyle: {
          fontFamily: Fonts.serif,
          fontSize: 11,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let icon: keyof typeof Ionicons.glyphMap = 'ellipse';

          switch (route.name) {
            case 'index':
              icon = focused ? 'home' : 'home-outline';
              break;
            case 'explore':
              icon = focused ? 'search' : 'search-outline';
              break;
            case 'rdv':
              icon = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'shop':
              icon = focused ? 'bag' : 'bag-outline';
              break;
            case 'profile':
              icon = focused ? 'person' : 'person-outline';
              break;
            default:
              icon = 'ellipse';
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Pour vous' }} />
      <Tabs.Screen name="explore" options={{ title: 'Recherche' }} />
      <Tabs.Screen name="rdv" options={{ title: 'Rendez-vous' }} />
      <Tabs.Screen name="shop" options={{ title: 'Boutique' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
      <Tabs.Screen name="messages" options={{ href: null, tabBarStyle: { display: 'none' } }} />
    </Tabs>
  );
}
