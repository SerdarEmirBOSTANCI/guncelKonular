import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import ResultScreen from './screens/ResultScreen';
import GameScreen1 from './screens/GameScreen1';
import MapsScreen from './screens/MapsScreen';
import AboutUs from './screens/AboutUs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HowToPlay" component={HowToPlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game1" component={GameScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MapsScreen" component={MapsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
