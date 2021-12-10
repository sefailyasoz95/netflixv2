import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/Stack/AuthStack';
import {StatusBar} from 'react-native';
export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
      <StatusBar barStyle="light-content" />
    </NavigationContainer>
  );
}
