import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Book, Trophy, User } from 'iconsax-react-native';  // Mengimpor ikon dari iconsax-react-native
import HomeScreen from '../screens/Home';
import DiscoverScreen from '../screens/Discover';
import AchievementScreen from '../screens/AchievementScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: colors.black, height: 60 },  // Menyeting gaya tab bar
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = focused ? <Home color={color} size={30} /> : <Home color={colors.white} size={30} />;
              break;
            case 'Discover':
              icon = focused ? <Book color={color} size={30} /> : <Book color={colors.white} size={30} />;
              break;
            case 'Achievement':
              icon = focused ? <Trophy color={color} size={30} /> : <Trophy color={colors.white} size={30} />;
              break;
            case 'Profile':
              icon = focused ? <User color={color} size={30} /> : <User color={colors.white} size={30} />;
              break;
            default:
              icon = <Home color={color} size={30} />;
          }
          return icon;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Achievement" component={AchievementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
