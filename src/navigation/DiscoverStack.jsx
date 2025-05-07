import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from '../screens/Discover';
import AddArticle from '../screens/Discover/AddArticle';
import EditArticle from '../screens/Discover/EditArticle';

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="AddArticle" component={AddArticle} />
      <Stack.Screen name="EditArticle" component={EditArticle} />
    </Stack.Navigator>
  );
};

export default DiscoverStack;
