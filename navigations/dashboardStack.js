import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../screens/Dashboard';
import CreateGroup from '../screens/CreateGroup';
import JoinGroup from '../screens/JoinGroup';
import GroupInfo from "../screens/GroupInfo";
import Chat from "../screens/Chat";

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
      component={GroupInfo}/>

      <Stack.Screen 
      name="Chat"
      component={Chat}/>

    </Stack.Navigator>
  );
}