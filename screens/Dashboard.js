// this is our dashboard page (TODO: implement components on it)
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {Text} from 'react-native';
import Streak from '../components/CommonCompStreak';
import { render } from 'react-dom';

import CommonCompGroupUserList from '../components/CommonCompGroupUserList';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      StreaksData: [{ // dummy data first. TODO: replace with db call from firebase
        "id" : 1,
        "data" : "3 days"
      },
      {
        "id" : 2,
        "data" : "207 days"
      }]
    };
  }

  render() {
    const myData = this.state.StreaksData[0]
    return (
      <View>
        <CommonCompGroupUserList groupMembers={['Jake','Caroline','Patrick','Tony','Jipeng','Daniel','testuse','Onemore']}/>
      </View>
    );
  }
}
export default Dashboard;