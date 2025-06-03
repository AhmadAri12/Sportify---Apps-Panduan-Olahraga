import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

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

export default function App() {
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