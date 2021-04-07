// this is our dashboard page (TODO: implement components on it)
import React, { Component } from 'react';
import {Text} from 'react-native';
import Streak from '../components/CommonCompStreak';
import { render } from 'react-dom';

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
      <view>
        <Streak numOfStreaks = {this.state.StreaksData[0].data} />
        <Streak numOfStreaks = {this.state.StreaksData[1].data} />
      </view>
    );
  }
}
export default Dashboard;