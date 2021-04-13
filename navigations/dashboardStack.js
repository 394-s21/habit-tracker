import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Image} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import CreateGroup from '../screens/CreateGroup';
import JoinGroup from '../screens/JoinGroup';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: '#3DD5F4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        name="Create Group"
        component={CreateGroup}
      />
      <Stack.Screen 
      name="Join Group"
      component={JoinGroup}/>
      <Stack.Screen
      name="View Group"
      component = {JoinGroup}/>
    </Stack.Navigator>
  );
}