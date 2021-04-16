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
        groupMemberNames : ['Jake','Caroline','Patrick','Justin','Jipeng','Daniel','testuse','Onemore'],
        complete : "?",
        groupID: this.props.route.params.groupID
    };
    }
    
    returnHome = () => {this.props.navigation.navigate("Dashboard")}
    completeDay = () => {
      const groupID = this.state.group[3];
      const db = firebase.database().ref('/groups/'+groupID);
      db.child('/streak').set(this.state.streak+1);
      this.setState((state, props) => {
        return {streak: this.state.streak + 1,
                complete: '!'};
      });}
    componentDidMount() {
      console.log('this.props.route.params',this.props.route.params);
      console.log('this.state.groupID', this.state.groupID);
      const groupArray  = [];
      const groupID = this.state.groupID;
      firebase.database().ref('/groups/'+groupID).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          groupArray.push(childSnapshot.toJSON());
        });
      });
      console.log('groupArray: ',groupArray);
      this.setState({group: groupArray});
      this.setState({streak: groupArray[6]});
      
    }
    render() {
      const stack = createStackNavigator()
      //TODO get data from firebase
      const recentHabit = [{'name': 'test0', 'recent': [1,0,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,0]}, {'name': 'test1', 'recent': [1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,1,0,0]}, {'name': 'test2', 'recent': [1,1,1,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,1,1]}];
      const group = this.state.group;
      console.log(group);
      const groupName = group[5];
      const streak = this.state.streak; 
      const goal = group[0];
      const freq = group[2];
      console.log(groupName);
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
            <CommonCompHabitChart groupMembersData = {recentHabit} groupColor={this.props.route.params.groupColor}/>
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


