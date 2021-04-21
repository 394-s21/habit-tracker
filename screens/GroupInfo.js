import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Subheading,Card, Button } from 'react-native-paper';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import CommonCompHabitChart from '../components/CommonCompHabitChart';

class GroupInfo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        group: [],
        streak : 1,
        personalGoals : "1 Lesson ",
        frequency : "Day",
        verifyNumber : "1",
        groupMemberIds : {},
        complete : "?",
        groupID: this.props.route.params.groupID,
        groupColor: this.props.route.params.groupColor,
        usernames: ['loading']
      };
    }
    
    returnHome = () => {this.props.navigation.navigate("Dashboard")}
    completeDay = () => {
      const groupID = this.state.group.groupID;
      const db = firebase.database().ref('/groups/'+groupID);
      db.child('/streak').set(this.state.group.streak+1);
      this.setState((state, props) => {
        return {streak: this.state.streak + 1,
                complete: '!'};
      });}

    componentDidMount() {
      const groupArray  = [];
      var usersArray = [];
      const groupID = this.state.groupID;
      this.setState({usernames: []})

      firebase.database().ref('/').on('value', (snapshot) => {
        const jsonSnap = snapshot.toJSON();
        usersArray = []
        for (var user in jsonSnap.groups[groupID].groupMemberIds){
            if (jsonSnap.users.hasOwnProperty(user)) {   
                usersArray.push(jsonSnap.users[user].first_name);
            }
        }
        this.setState({usernames: usersArray});
        this.setState({group: jsonSnap.groups[groupID]});
      });
      
      
    }
    render() {
      const stack = createStackNavigator()
      //TODO get data from firebase
      const group = this.state.group;
      const recentHabits = group.groupMemberIds;
      const groupName = group.groupName;
      const streak = group.streak; 
      const goal = group.goal;
      const freq = group.groupFreq;
      const usernames = this.state.usernames;
      return (
        <SafeAreaView style={this.styles.container}>
          <ScrollView>
            <Text style={this.styles.title}>{groupName}</Text>
            <Text style={this.styles.smolerText}>{goal}</Text>
            <View style={{flexDirection:"row"}}>
             <Card style={this.styles.card}>
               <Card.Content>
                 <Subheading style={this.styles.subheading}>Group status:</Subheading>
                    <Text style={this.styles.bigNum}>{streak}</Text>
                 <Text style={this.styles.smolerText}>{freq} Streak</Text>   
               </Card.Content>
             </Card>

            <Card style={this.styles.card}>
             <Card.Content>
                <Subheading style={this.styles.subheading}>Personal Goal:</Subheading>
                
                 <Text style={this.styles.colorText}>{this.state.personalGoals}{freq}</Text>
              
                <Subheading style={this.styles.subheading}>Needs:</Subheading>
                <Text style={this.styles.colorText}>{this.state.verifyNumber} person to verify</Text>
              </Card.Content>
            </Card>
            </View>

            <CommonCompHabitChart groupMembersData = {recentHabits} groupMembersNames = {usernames} groupColor={this.props.route.params.groupColor}/>
            <Button mode="contained" dark="true" onPress={this.completeDay} style={this.styles.button}>
              Completed today{this.state.complete}
            </Button>
          </ScrollView>
        </SafeAreaView>
      );
    }
    

    styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ecf0f1'
          },
        title: {
          alignSelf: 'center',
          marginTop: 15,
          marginBottom: 0,  
          justifyContent: 'center',  
            height: 60,
            fontSize: 30,
            fontWeight: "bold",
            color: this.props.route.params.groupColor
        },
        button: {
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: this.props.route.params.groupColor,
          padding: 10,
          width: 350,
          marginTop: 16,
        },
        bigNum: {
          textAlign: "center",  
            height: 60,
            fontSize: 50,
            fontWeight: "bold",
            color: this.props.route.params.groupColor
        },
        card: {
            marginTop: 0,
            backgroundColor:'white',
            marginHorizontal: 10,
            width: 180
          },
        smolerText: {
            textAlign: "center",
            fontWeight: "100",
            marginBottom: 20
        },
        subheading: {
            textAlign: "center",
            //alignSelf: 'center',
            //justifyContent: 'center', 
            fontWeight: "600",
            height: 35,
          },
        colorText: {
            //fontFamily: "Inter",
            alignSelf: 'center',
            justifyContent: 'center',  
            fontStyle: "italic",
            color: this.props.route.params.groupColor
        }
    });
};

export default GroupInfo;


