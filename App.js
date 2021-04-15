import 'react-native-gesture-handler';
import React from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardStack from './navigations/dashboardStack';
import GroupInfo from './screens/GroupInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Dashboard"
          component={DashboardStack}
        />
        <Stack.Screen
          name="View Group"
          component={DashboardStack}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>)}