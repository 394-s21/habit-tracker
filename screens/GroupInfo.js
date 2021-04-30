import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, Alert, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Subheading,Card, Button } from 'react-native-paper';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import CommonCompHabitChart from '../components/CommonCompHabitChart';
import AsyncStorage from '@react-native-community/async-storage';
import colorMap from '../utils/color';

const winWidth = Dimensions.get('window').width;

class GroupInfo extends Component {
    constructor(props) {
      super(props);
      this.props.navigation.setOptions({
        headerStyle: { backgroundColor: colorMap[this.props.route.params.groupColor] },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }})
  
      this.state = {
        group: [],
        streak : 1,
        personalGoals : "1 Completion ",
        frequency : "Day",
        verifyNumber : "All",
        groupMemberIds : {},
        complete : 0,
        groupID: this.props.route.params.groupID,
        groupColor: this.props.route.params.groupColor,
        usernames: ['loading'],
        mvis: false,
        invite: false
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
      console.log("Streak ", this.state.streak, "Complete? ", this.state.complete)
      db.child('/'+ today).set(1);
      this.setState((state, props) => {
          return {streak: this.state.streak + 1,
                  complete: 1};
        });
    }

    undoCompleteDay = () => {
      const groupID = this.state.group.groupID;
      const userId = this.state.userID
      const db = firebase.database().ref('/groups/'+groupID+'/groupMemberIds/'+userId);
      const moment = require('moment');
      let today = moment().format('YYYY/MM/DD');
      today = today.split('/').join('');
      db.child('/' + today).set(0);
      console.log("Streak ", this.state.streak, "Complete? ", this.state.complete)
      this.setState((state, props) => {
          return {
                streak: this.state.group.streak - 1,
                complete: 0
            };
        });}
  

    componentDidMount() {
      const groupArray  = [];
      var usersArray = [];
      const groupID = this.state.groupID;
      this.setState({usernames: []})
      //TODO remove after dev
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      this.setState({userID: userId})

      firebase.database().ref('/').on('value', (snapshot) => {
        const firebaseDB = snapshot.toJSON();
        usersArray = []

        //makes sure group hasn't been deleted 
          if (firebaseDB.groups.hasOwnProperty(groupID) && firebaseDB.groups[groupID].groupMemberIds.hasOwnProperty(userId)) {
              for (var user in firebaseDB.groups[groupID].groupMemberIds) {
                  if (firebaseDB.users.hasOwnProperty(user)) {
                      usersArray.push(firebaseDB.users[user].first_name + ' ' + firebaseDB.users[user].last_name);
                  }
              }
              const moment = require('moment');
              const today = moment().format('YYYY/MM/DD').split('/').join('');
              this.setState({ usernames: usersArray });
              this.setState({ group: firebaseDB.groups[groupID] });
              if (firebaseDB.groups[groupID].groupMemberIds[userId].hasOwnProperty(today)) {
                  this.setState({ complete: firebaseDB.groups[groupID].groupMemberIds[userId][today] })
              }
          }
      });
    }

    gotTodashboard = () => {this.props.navigation.navigate('Dashboard') }

    goToChat = () => {
      console.log(`transition to ${this.state.groupID}`)
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      var userFirstName;
      firebase.database().ref('/users/' + userId).on('value', (snapshot) => {
        if (snapshot.exists()) {
          userFirstName = snapshot.val().first_name
        }
      })
      console.log(`data is ${userFirstName}`)
      // const user = AsyncStorage.removeItem('user')
      // console.log(`user ${user} removed`)
      this.props.navigation.navigate('Chat', {
        groupID: this.state.groupID,
        _id: userId,
        name: userFirstName}) 
    }

    setModalVisible = (isVis) => {
        this.setState({mvis: isVis})
    }

    setIdVisible = (inv) => {
        this.setState({invite: !inv})
    }

    
    leaveGroup = () => {
        const groupID = this.state.groupID;
        if (this.state.usernames.length == 1) {
            const dbGroup = firebase.database().ref('/groups/' + groupID);
            dbGroup.remove();
            console.log("wow")
        } else {
            //TODO remove after dev
            const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
            const dbGroupUser = firebase.database().ref('/groups/' + groupID + '/groupMemberIds/' + userId);
            dbGroupUser.remove();
        }
        this.gotTodashboard()
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
      const groupID = this.state.groupID
      return (
        <SafeAreaView style={this.styles.container}>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.mvis}
                  onRequestClose={() => {
                      this.setModalVisible(!this.state.mvis);
                  }}>
                  <View style={this.styles.centeredView}>
                      <View style={this.styles.modalView}>
                          <Text style={this.styles.modalText}>Are you sure want to leave this group?</Text>
                          <TouchableOpacity
                              style={[this.styles.leaveButton]}
                              onPress={() => {this.leaveGroup(); Alert.alert("You have left the group");}}
                          >
                              <Text style={this.styles.textStyle}>LEAVE GROUP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={[this.styles.cancelButton]}
                              onPress={() => this.setModalVisible(!this.state.mvis)}
                          >
                              <Text style={this.styles.textStyle}>CANCEL</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </Modal>
          <ScrollView style={{width: winWidth}}>
            <View style={this.styles.topContainer}>
            <Text style={this.styles.title}>{groupName}</Text>
            </View>
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
                <Text style={this.styles.colorText}>{this.state.verifyNumber} members to do</Text>
              </Card.Content>
            </Card>
            </View>

            <CommonCompHabitChart groupID = {groupID} groupMembersData = {recentHabits} groupMembersNames = {usernames} groupColor={colorMap[this.state.groupColor]}/>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button mode="contained" dark="true" onPress={this.state.complete ? () => this.undoCompleteDay() : () => this.completeDay()} style={this.styles[!this.state.complete ? 'button' :'compButton']}>
              {this.state.complete ? `Completed! (Tap to Undo)` : 'Log Completion'}
            </Button>    
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={this.styles['button']} mode="contained" onPress={() => this.setIdVisible(this.state.invite)}>{this.state.invite ? 'Group ID: '+ groupID : 'Invite Member'}</Button>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={this.styles['button']} mode="contained" onPress={() => this.goToChat()}>{"Go to group chat"}</Button>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
            <Button style={{backgroundColor: "black"}} mode="contained" onPress={() => this.setModalVisible(true)}>Leave Group</Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
    

    styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "grey",
            borderWidth: 3,
            borderRadius: 20,
            padding: 30,
            paddingBottom: 10,
            alignItems: "center",
            shadowColor: "#000",
            width: 300,
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          leaveButton: {
            borderRadius: 10,
            padding: 10,
            elevation: 2,
            backgroundColor: "#FF5555",
          },
          cancelButton:{
            borderRadius: 10,
            margin: 20,
            padding: 5,
            elevation: 2,
            backgroundColor: "#56B7FF",
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: "center"
          },
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
            height: 70,
            fontSize: 30,
            fontWeight: "bold",
            color: colorMap[this.props.route.params.groupColor]
        },
        topContainer : {
            flex: 1,
            zIndex: 1,
        },
        exitContainer: {
            position: 'absolute',
            top: 17,
            right: 5
        },
        exit: {
            height: 50,
            width: 50,
        },
        button: {
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: colorMap[this.props.route.params.groupColor],
            padding: 10,
            width: 350,
            marginTop: 15,
          },
        compButton: {
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: colorMap[this.props.route.params.groupColor],
          padding: 10,
          width: 300,
          height: 55,
          marginTop: 15,
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
            color: colorMap[this.props.route.params.groupColor]
        },
        card: {
            marginTop: 0,
            backgroundColor:'white',
            marginHorizontal: '2.5%',
            width: '45%',
          },
        smolerText: {
            textAlign: "center",
            fontWeight: "100",
            fontSize: 25,
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
            color: colorMap[this.props.route.params.groupColor]
        }
    });
};

export default GroupInfo;


