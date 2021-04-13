import React, { Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupComponentCard from '../components/CommonCompGroupCard';
import { createStackNavigator } from '@react-navigation/stack';


class Dashboard extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        groups: [{'groupName': 'School of Rock',
      'goal': 'Practice Guitar',
      'groupMemberNames': ['Justin','Roy'],
      'streak': 4,
      'groupColor': 'purple',
      'groupFreq': 'weekly',
      'groupID': 15781}],
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
    
    creatGroup = () => {this.props.navigation.navigate("Create Group")}
    joinGroup = () => {this.props.navigation.navigate('Join Group')}

    render() {
      const myData = this.state.StreaksData
      const stack = createStackNavigator()
      console.log('this.props: ',this.props);
      const groups = this.state.groups;
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
              {groups.map(group => <GroupComponentCard groupName={group.groupName}
                                              goal={group.goal}
                                              groupMemberNames={group.groupMemberNames}
                                              streak={group.streak}/>)}
           
              <TouchableOpacity style={styles.button} onPress = {this.creatGroup}>
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