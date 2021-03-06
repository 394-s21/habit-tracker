import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import alert from '../components/CommonCompAlert';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import moment from 'moment';
class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state= {
      newGroupID: null
    }
  }

  groupIdNotFoundAlert = () =>
    alert(
      "Group ID not found.",
      "Please make sure to enter the correct group ID.",
      [
        { text: "Cancel"},
        { text: "Ok"}
      ]
  );
  joinGroupSuccessfulAlert = () =>
    alert(
      "Join Group Successful.",
      "View your group in your dashboard",
      [
        { text: "Cancel"},
        { text: "Ok"}
      ]
  );
  groupIdAleadyExists = () =>
    alert(
      "Cannot join group.",
      "You have already joined this group",
      [
        { text: "Cancel"},
        { text: "Ok"}
      ]
  );
  handleSubmit = () => {
    const groupItems = firebase.database().ref('/groups') // initialize firebase to read groups data
    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
    const groupID = this.state.newGroupID
    const db = firebase.database().ref() // initialize firebase reference
    var groupIds = []
    groupItems.on("value", datasnap => {
      groupIds = Object.keys(datasnap.val())
    })
    if(groupIds.includes(groupID)){
      const moment = require('moment')
      const today = moment().format('YYYY/MM/DD').split('/').join('')
      const dateDict = {}
      dateDict[today] = 0
      db.child('/groups/'+groupID +'/groupMemberIds/'+userId).once("value")
      .then(userIdSnapShot => {
        // user is NOT in the group member ID list
        if(!userIdSnapShot.exists()) {
          // create a userId reference to a list of dates
          db.child('/groups/'+groupID+'/groupMemberIds/'+ userId).set(dateDict)
          this.joinGroupSuccessfulAlert()
        } else{ // user is in the group member ID list
          this.groupIdAleadyExists()
        }
      })
    } 
    else{
      this.groupIdNotFoundAlert()
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TextInput label='Group ID' 
                      value={this.state.newGroupID} 
                      type="outlined"
                      
                      style={styles.field}
                      onChangeText={text => this.setState({newGroupID:text})} />
          
          <Button mode="contained" dark="true" onPress={this.handleSubmit} style={styles.button} title="JOIN">
            JOIN
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: '#3DD5F4'
  },
  options: {
    paddingTop: 10
  },
  card: {
    marginTop: 15,
    backgroundColor:'white',
    width: 350
  },
  row: {
    justifyContent: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 13
  },
  subheading: {
    fontWeight: "600",
    height: 35,
    width: 350
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  field: {
    marginTop: 15,
    height: 55,
    width: 350,
    padding: 5,
    backgroundColor: 'white',
  },
  fieldContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
  }
});
export default JoinGroup;