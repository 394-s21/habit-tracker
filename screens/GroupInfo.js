import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Subheading,Card, Button } from 'react-native-paper';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import CommonCompHabitChart from '../components/CommonCompHabitChart';
import moment from 'moment';

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
        complete : 0,
        groupID: this.props.route.params.groupID,
        groupColor: this.props.route.params.groupColor,
        usernames: ['loading']
      };
    }
    
    returnHome = () => {this.props.navigation.navigate("Dashboard")}
    completeDay = () => {
      const groupID = this.state.group.groupID;
      const userId = this.state.userID
      const db = firebase.database().ref('/groups/'+groupID+'/groupMemberIds/'+userId);
      const moment = require('moment');
      let today = moment().format('YYYY/MM/DD');
      today = today.split('/').join('');
      db.child('/'+ today).set(1);
      this.setState((state, props) => {
        return {streak: this.state.streak + 1,
                complete: 1};
      });}

    undoCompleteDay = () => {
        const groupID = this.state.group.groupID;
        const userId = this.state.userID
        const db = firebase.database().ref('/groups/' + groupID + '/groupMemberIds/' + userId);
        const moment = require('moment');
        let today = moment().format('YYYY/MM/DD');
        today = today.split('/').join('');
        db.child('/' + today).set(0);
        this.setState((state, props) => {
            return {
                streak: this.state.streak - 1,
                complete: 0
            };
        });
    }

    componentDidMount() {
      const groupArray  = [];
      var usersArray = [];
      const groupID = this.state.groupID;
      this.setState({usernames: []})
      const userId = firebase.auth().currentUser.uid;
      this.setState({userID: userId})

      firebase.database().ref('/').on('value', (snapshot) => {
        const firebaseDB = snapshot.toJSON();
        usersArray = []
        for (var user in firebaseDB.groups[groupID].groupMemberIds){
            if (firebaseDB.users.hasOwnProperty(user)) {   
                usersArray.push(firebaseDB.users[user].first_name + ' ' + firebaseDB.users[user].last_name);
            }
        }
        const moment = require('moment');
        let today = moment().format('YYYY/MM/DD');
        today = today.split('/').join('');
        this.setState({usernames: usersArray});
        this.setState({group: firebaseDB.groups[groupID]});

        if(firebaseDB.groups[groupID].groupMemberIds[userId].hasOwnProperty(today)){
            this.setState({complete: firebaseDB.groups[groupID].groupMemberIds[userId][today]})
        }

      });
      
      
    }
    render() {
      const stack = createStackNavigator()
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
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button mode="contained" dark="true" disabled= {this.state.complete} onPress={this.completeDay} style={this.styles[!this.state.complete ? 'button' :'compButton']}>
              {this.state.complete ? 'Completed!' : 'Completed Today?'}
            </Button>
            {!this.state.complete ? <View></View> :
            <Button mode="contained" dark="true" disabled= {!this.state.complete} onPress={this.undoCompleteDay} style={this.styles.undoButton}>
              {'UNDO'}
            </Button>
            }
            </View>
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
            marginTop: 35,
          },
        compButton: {
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: this.props.route.params.groupColor,
          padding: 10,
          width: 300,
          height: 55,
          marginTop: 35,
          marginLeft: 10
        },
        undoButton: {
            alignSelf: 'center',
            justifyContent: 'center',
            padding: 0,
            width: 75,
            height: 55,
            marginTop: 35,
            marginLeft: 5,
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


