import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

import HomeScreen from './src/screens/Home';
import DiscoverScreen from './src/screens/Discover';
import AddArticle from './src/screens/Discover/AddArticle';
import EditArticle from './src/screens/Discover/EditArticle';
import ArticleDetail from './src/screens/Discover/ArticleDetail';
import { AchievementScreen } from './src/screens/AchievementScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen name="AddArticle" component={AddArticle} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
      <Stack.Screen name="EditArticle" component={EditArticle} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="AchievementScreen" component={AchievementScreen} />
    </Stack.Navigator>
  );
}

// Request permissions and register Firebase messaging
async function registerAppWithFCM() {
  // Request notification permission
  const permission = await messaging().requestPermission();
  if (permission !== messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('Permission denied for remote notifications');
    return;
  }

  // Register device for receiving FCM messages
  await messaging().registerDeviceForRemoteMessages();
  
  // Get FCM token
  const token = await messaging().getToken();
  console.log('FCM token:', token);
}

const createNotificationChannel = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Notification Channel',
    importance: AndroidImportance.HIGH,
  });
  return channelId;
};

const displayNotification = async () => {
  const channelId = await createNotificationChannel();
  await notifee.displayNotification({
    title: 'Welcome!',
    body: 'This is a test notification.',
    android: { channelId },
  });
};

export default function App() {
  useEffect(() => {
    // Request notification permission and set up Firebase
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    registerAppWithFCM();

    // Display local notification (optional example)
    displayNotification();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: { backgroundColor: colors.black },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Discover':
                iconName = 'book';
                break;
              case 'Achievement':
                iconName = 'trophy';
                break;
              case 'Profile':
                iconName = 'person';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverStack} />
        <Tab.Screen name="Achievement" component={AchievementScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
