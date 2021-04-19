import React, { Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommonCompGroupUserList from '../components/CommonCompGroupUserList';
import colorMap from '../utils/color';
import {firebase} from '../utils/firebase';
import 'firebase/database';

class Dashboard extends Component {
    constructor(props) {
      super(props);

      this.state = {
        groups: [],
        loading: false

      };
    }
  
    createGroup = () => {this.props.navigation.navigate('Create Group')};
    joinGroup = () => {this.props.navigation.navigate('Join Group')};
    viewGroup = (val, clr) => {this.props.navigation.navigate('View Group',{groupID: val, groupColor: clr})}
    
    componentDidMount() {
      this.setState({loading: true});
      this.setState({groups: []});
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      firebase.database().ref('/groups').on('value', (snapshot) => {
        const groupArray = []
        snapshot.forEach(function (childSnapshot) {
          // only display groups that the user is in
          const groupMemberIdJson = childSnapshot.toJSON().groupMemberIds
          if (groupMemberIdJson && groupMemberIdJson.hasOwnProperty(userId)){
            groupArray.push(childSnapshot.toJSON());
          }
        });
        this.setState({loading: false})
        this.setState({groups: groupArray});
      });
    }

    render() {
      const groups = this.state.groups;
      const loading = this.state.loading;
      // const RightContent = () => <Text style={styles.streak}>{streak}</Text>
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
              {loading && <Text>Loading...</Text>}
              {groups.map(group => 
                <View style={styles.container}>
                  <Card 
                    style={{backgroundColor: colorMap[group.groupColor]}} 
                    onPress={() => {this.viewGroup(group.groupID, group.groupColor)}}
                    key={group.groupID}>
                    <Card.Title 
                      title={group.goal} 
                      subtitle="Completed: 1/6" right={() => <Text>{group.streak}</Text>}/> 
                    <CommonCompGroupUserList groupMembers={Object.keys(group.groupMemberIds)} />
                  </Card>
                </View>)}

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
  container: {
    flex: 1,
    padding: 10,
  },

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
