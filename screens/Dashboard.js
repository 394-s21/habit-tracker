import React, { useContext, useState, useEffect, Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommonCompGroupCard from '../components/CommonCompGroupCard';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import { useCardAnimation } from '@react-navigation/stack';

class Dashboard extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        groups: [{
            "goal" : "",
            "groupColor" : "",
            "groupFreq" : "",
            "groupID" : 0,
            "groupMemberIds" : {},
            "groupName" : "",
            "streak" : 0
          }]
      };
    }
    

    createGroup = () => {this.props.navigation.navigate('Create Group')};
    joinGroup = () => {this.props.navigation.navigate('Join Group')};
    viewGroup = (val) => {this.props.navigation.navigate('View Group',{groupID: val})}
    
    componentDidMount() {
      this.setState({groups: []});
      const groupArray  = [];
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      firebase.database().ref('/groups').on('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          // only display groups that the user is in
          const groupMemberIdJson = childSnapshot.toJSON().groupMemberIds
          if (groupMemberIdJson && groupMemberIdJson.hasOwnProperty(userId)){
            groupArray.push(childSnapshot.toJSON());
          }
        });
        console.log("group member Id is ", groupArray)
        this.setState({groups: groupArray});
      });
    }

    render() {
      const groups = this.state.groups;
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 0 }}>
            <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                
            <ScrollView style={{
                alignSelf: 'stretch',
            }}>

              {groups.map(group => <TouchableOpacity onPress={() => {this.viewGroup(group.groupID)}} key={groups.groupID}><CommonCompGroupCard groupName={group.groupName}
                                              goal={group.goal}
                                              // groupMemberNames={group.groupMemberIds} // TODO: add method to fetch first names
                                              streak={group.streak}
                                              groupID={group.groupID}/></TouchableOpacity>)}

              <TouchableOpacity style={styles.button} onPress = {this.createGroup}>
                  <Text style={{textAlign: 'center'}}>Create New Group <MaterialCommunityIcons name="plus" /></Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress = {this.joinGroup}>
                  <Text style={{textAlign: 'center'}}>Join Existing Group </Text>
              </TouchableOpacity>
            </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      );
    }
    
};

const styles = StyleSheet.create({
  button: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 175,
      marginTop: 16,
    },
});
export default Dashboard;

/*<GroupComponentCard groupName='School of Rock' goal='Practice guitar' groupMemberNames={this.state.groupMemberNamesTwo} streak={myData[0]} />
              <GroupComponentCard groupName='Purple Team' goal='Learn React Native' groupMemberNames={this.state.groupMemberNames} streak={myData[1]}/> */
