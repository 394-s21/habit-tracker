import React, { Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupComponentCard from '../components/CommonCompGroupCard';
import { createStackNavigator } from '@react-navigation/stack';


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
        groupMemberNames : ['Jake','Caroline','Patrick','Justin','Jipeng','Daniel','testuse','Onemore'],
        groupMemberNamesTwo :['Justin', 'Roy']
      };
    }
    
    creatGroup = () => {this.props.navigation.navigate('CreateGroup')}

    render() {
      const myData = this.state.StreaksData
      const stack = createStackNavigator()
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
              <GroupComponentCard groupName='School of Rock' goal='Practice guitar' groupMemberNames={this.state.groupMemberNamesTwo} streak={myData[0]} />
              <GroupComponentCard groupName='Purple Team' goal='Learn React Native' groupMemberNames={this.state.groupMemberNames} streak={myData[1]}/>
            </View>
            <TouchableOpacity style={styles.button} onPress = {this.creatGroup}>
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


