import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./navigation/TabNavigator";

 const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

export default App