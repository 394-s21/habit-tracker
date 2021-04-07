// this is our dashboard page (TODO: implement components on it)
import React, { Component } from 'react';
import { View } from 'react-native';
import Streak from '../components/CommonCompStreak';

import CommonCompGroupUserList from '../components/CommonCompGroupUserList';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      StreaksData: [{ // dummy data first. TODO: replace with db call from firebase
        "id" : 1,
        "data" : 1,
      },
      {
        "id" : 2,
        "data" : 207,
      }],
      groupMemberNames : ['Jake','Caroline','Patrick','Tony','Jipeng','Daniel','testuse','Onemore']
    };
  }

  render() {
    const myData = this.state.StreaksData
    
    return (
      <View>
        <Streak data = {myData[0].data > 1? myData[0].data  + " days" : myData[0].data  + " day"}/>
        <Streak data = {myData[1].data > 1? myData[1].data  + " days" : myData[0].data  + " day"}/>
        <CommonCompGroupUserList groupMembers={this.state.groupMemberNames}/>
      </View>
    );
  }
}
export default Dashboard;