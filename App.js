import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ProductScreen from './screens/ProductScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.theme && Constants.manifest.extra.theme.colors) || {};
  const colors = {
    background: theme.background || '#0f1724',
    backgroundLight: '#106fa4',
  };

  return (
    <LinearGradient colors={[colors.background, colors.backgroundLight]} style={{ flex: 1 }} start={[0, 0]} end={[1, 1]}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: 'transparent' }
          }}
        >
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'rgba(255,255,255,0.3)' },
              headerTintColor: '#9CA3AF',
              headerTitleStyle: { color: '#9CA3AF' },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'fade'
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </LinearGradient>
  );
}
