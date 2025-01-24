import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import ResultScreen from './screens/ResultScreen';
import ResultScreen2 from './screens/ResultScreen2';
import GameScreen1 from './screens/GameScreen1';
import GameScreen2 from './screens/GameScreen2';
import MapsScreen from './screens/MapsScreen';
import AboutUs from './screens/AboutUs';
import MapSelect from './screens/MapsSelect';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HowToPlay" component={HowToPlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game1" component={GameScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="Game2" component={GameScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen2" component={ResultScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="MapsScreen" component={MapsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
        <Stack.Screen name="MapSelect" component={MapSelect} options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
