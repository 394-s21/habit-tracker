import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Image} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './screens/Dashboard';
import CreateGroup from './screens/CreateGroup';
import profilePic from './assets/profilePic.jpg';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardStack() {
  const headerLeft = () => {

  }
  return (
    <Stack.Navigator
      initialRouteName="CreateGroup"
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
        name="CreateGroup"
        component={CreateGroup}
        // TODO: fix this as it causes a text component exception on IOS
        // options={{ title: '',
        // headerLeft: () => (<View><Text style={{fontWeight:'bold', fontSize: 30, color: 'white', paddingLeft: 10}}>CoSava</Text> 
        //                         <Text style={{color:'white',fontSize: 18, paddingLeft: 10}}>Create Group</Text></View>),
        //           headerRight: () => (<View style={{paddingRight:10}}><Image source={{uri: profilePic}} style={{width:40,height:40}}/> </View>) }}
      />
    </Stack.Navigator>
  );
}

/*function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#3DD5F4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
    </Stack.Navigator>
  );
}*/

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBarOptions={{
          activeTintColor: '#3DD5F4',
        }}>
        <Tab.Screen
          name="ProfileStack"
          component={DashboardStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="face-profile"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="DashboardStack"
          component={DashboardStack}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={DashboardStack}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="wrench"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
