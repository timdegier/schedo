import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import home from "../screens/home";
import add from "../screens/add";
import account from "../screens/account";
import viewTodo from "../screens/viewTodo";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="ViewTodo" component={viewTodo} />
    </Stack.Navigator>
  );
}

const AddNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add To Do" component={add} />
    </Stack.Navigator>
  );
}

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={account} />
    </Stack.Navigator>
  );
}

export { HomeNavigator, AddNavigator, AccountNavigator };