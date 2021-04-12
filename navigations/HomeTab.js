import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardStack from './navigations/dashboardStack';
import LoginStack from './navigations/LoginStack';


const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LoginStack"
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
          name="LoginStack"
          component={LoginStack}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="wrench" color={color} size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
