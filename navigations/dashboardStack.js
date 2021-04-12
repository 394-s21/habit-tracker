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
import GroupInfo from "../screens/GroupInfo";

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
        // TODO: fix this as it causes a text component exception on IOS
        // options={{ title: '',
        // headerLeft: () => (<View><Text style={{fontWeight:'bold', fontSize: 30, color: 'white', paddingLeft: 10}}>CoSava</Text> 
        //                         <Text style={{color:'white',fontSize: 18, paddingLeft: 10}}>Dashboard</Text></View>),
        //           headerRight: () => (<View style={{paddingRight:10}}><Image source={{uri: profilePic}} style={{width:40,height:40}}/> </View>)}}
      />
      <Stack.Screen
        name="Create Group"
        component={CreateGroup}
        // TODO: fix this as it causes a text component exception on IOS
        // options={{ title: '',
        // headerLeft: () => (<View><Text style={{fontWeight:'bold', fontSize: 30, color: 'white', paddingLeft: 10}}>CoSava</Text> 
        //                         <Text style={{color:'white',fontSize: 18, paddingLeft: 10}}>Create Group</Text></View>),
        //           headerRight: () => (<View style={{paddingRight:10}}><Image source={{uri: profilePic}} style={{width:40,height:40}}/> </View>) }}
      />
      <Stack.Screen 
      name="Join Group"
      component={JoinGroup}/>

      <Stack.Screen 
      name="View Group"
      component={GroupInfo}/>
    </Stack.Navigator>
  );
}