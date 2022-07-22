import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeNavigator, AddNavigator, AccountNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home': 'home-outline';
        } else if (route.name === 'Add') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Account') {
          iconName = focused ? 'finger-print' : 'finger-print-outline';
        }

        return <Ionicons name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#1CA2ED',
      inactiveTintColor: '#000',
      showLabel: false,
      labelPosition: 'below-icon',
      labelStyle: {
        margin: 0
      },
      style: {
        height: 100
      }
    }}>

      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Add" component={AddNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;