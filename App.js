import 'react-native-gesture-handler';
import React from 'react';
import Login from './screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardStack from './navigations/dashboardStack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="Dashboard"
          component={DashboardStack}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>)}
