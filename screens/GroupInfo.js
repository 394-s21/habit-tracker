import React, { Component } from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupComponentCard from '../components/CommonCompGroupCard';
import { createStackNavigator } from '@react-navigation/stack';
import { Subheading } from 'react-native-paper';


class GroupInfo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        streak : 1,
        personalGoals : "1 Lesson per ",
        frequency : "Day",
        verifyNumber : "2",
        groupMemberNames : ['Jake','Caroline','Patrick','Justin','Jipeng','Daniel','testuse','Onemore'],
        complete : "?"
    };
    }
    
    returnHome = () => {this.props.navigation.navigate("Dashboard")}
    completeDay = () => {this.setState({streak : 2, complete : "!"})}

    render() {
      const stack = createStackNavigator()
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{flexDirection:"row"}}>
             <Card style={styles.card}>
               <Card.Content>
                 <Subheading style={styles.subheading}>Group status:</Subheading>
                   <View style={styles.bigNum}>
                     {this.streak}
                   </View>
                 <Subheading styles={styles.smolerText}>{this.frequency} Streak</Subheading>   
               </Card.Content>
             </Card>

            <Card style={styles.card}>
             <Card.Content>
                <Subheading style={styles.subheading}>Personal Goal:</Subheading>
                <View style={styles.colorText}>
                 {this.personalGoals} {this.streak}
                </View>
                <Subheading style={styles.subheading}>Needs:</Subheading>
                <View style={styles.colorText}>
                 {this.verifyNumber} people to verify
                </View>
              </Card.Content>
            </Card>
            </View>
            <Button mode="contained" dark="true" onPress={this.completeDay} style={styles.button}>
              Completed today{this.complete}
            </Button>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
      },
    button: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 175,
      marginTop: 16,
    },
    bigNum: {
        height: 60,
        color: "#DDDDDD"
    },
    card: {
        marginTop: 15,
        backgroundColor:'white',
        width: 160
      },
    smolerText: {
        fontWeight: "100",
        height: 15,
    },
    subheading: {
        fontWeight: "600",
        height: 35,
        width: 350,
      },
    colorText: {
        fontFamily: "Inter",
        fontStyle: "italic",
        color: '#DDDDDD'
    }
});
export default GroupInfo;


