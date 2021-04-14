import React, { useContext, useState, useEffect, Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupComponentCard from '../components/CommonCompGroupCard';
import {firebase} from '../utils/firebase';
import 'firebase/database';

class Dashboard extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        groups: [],
        StreaksData: [{ // dummy data first. TODO: replace with db call from firebase
          "id" : 1,
          "data" : 1,
        },
        {
          "id" : 2,
          "data" : 207,
        }],
        groupMemberNames : ['Jake','Caroline','Patrick','Justin','Jipeng','Daniel','testuse','Onemore'],
        groupMemberNamesTwo :['Justin', 'Roy']
      };
    }
    

    createGroup = () => {this.props.navigation.navigate('Create Group')};
    joinGroup = () => {this.props.navigation.navigate('Join Group')};
    viewGroup = (val) => {this.props.navigation.navigate('View Group',{groupID: val})}
    
    componentDidMount() {
      const groupArray  = [];
      firebase.database().ref('/groups').on('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          groupArray.push(childSnapshot.toJSON());
        });
        this.setState({groups: groupArray});
        //console.log(groupArray);
      });
    }

    render() {
      const groups = this.state.groups;
      console.log('groups: ',groups);
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 16 }}>
            <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                
            <ScrollView>

              {groups.map(group => <TouchableOpacity style={styles.button} />)}

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
