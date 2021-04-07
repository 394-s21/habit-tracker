import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { render } from 'react-dom';
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
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
            <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                
            <View>
              <Streak data = {myData[0].data > 1? myData[0].data  + " days" : myData[0].data  + " day"}/>
              <Streak data = {myData[1].data > 1? myData[1].data  + " days" : myData[0].data  + " day"}/>
              <CommonCompGroupUserList groupMembers={this.state.groupMemberNames}/>
            </View>
            <TouchableOpacity
                style={styles.button}
                >
                <Text>Create New Group <MaterialCommunityIcons name="plus" /></Text>
            </TouchableOpacity>
            
            </View>
            
        </View>
        </SafeAreaView>
        );
    }
    
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
      },
});
export default Dashboard;


