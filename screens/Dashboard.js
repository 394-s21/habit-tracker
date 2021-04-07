import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
//import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
            <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                
            <Streak numOfStreaks = {this.state.StreaksData[0].data} />
            <Streak numOfStreaks = {this.state.StreaksData[1].data} />
            
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






