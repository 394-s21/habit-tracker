import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

class App extends Component {

  constructor() {
    super();
    this.state = {
      groups: [{'groupName': 'School of Rock',
      'goal': 'Practice Guitar',
      'groupMemberNames': ['Justin','Roy'],
      'streak': 4,
      'groupColor': 'purple',
      'groupFreq': 'weekly',
      'groupID': 15781}],
      idCount: 15782
    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            groups={this.state.groups}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>);
    }
  }

  export default App;
    