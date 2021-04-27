import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import moment from 'moment';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import {firebase} from '../utils/firebase';
import {genRandom} from '../utils/genRandom';
import 'firebase/database';
import alert from '../components/CommonCompAlert';
class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state= {
      groupName: "",
      groupHabit: "",
      groupFreq: "daily",
      groupColor: "red",
      groupID: null,
      groups: [],
      visible: false, 
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  gotTodashboard = () => {this.props.navigation.navigate('Dashboard')}

  showDialog = () => this.setState({visible: true});

  hideDialog = () => {
    this.setState({visible: false});
    this.props.navigation.navigate('Dashboard');
  }

  groupNameNotFound = () =>
    alert(
      "Group name not found.",
      "Please enter your group name.",
      [
        { text: "Cancel"},
        { text: "Ok"}
      ]
  );
  habitNotFound = () =>
    alert(
      "Habit not found.",
      "Please enter a brief summary of your habit.",
      [
        { text: "Cancel"},
        { text: "Ok"}
      ]
  );

  handleSubmit = () => {
    console.log('will validate input, upload to firebase, generate group ID here');
    console.log('group Name: ',this.state.groupName);
    console.log('group habit: ',this.state.groupHabit);
    console.log('group freq: ',this.state.groupFreq);
    console.log('group color', this.state.groupColor);
    if(this.state.groupName === ""){ // if user does not enter group name
      this.groupNameNotFound()
    } else if(this.state.groupHabit === ""){ // if user does not enter habit summary
      this.habitNotFound()
    } else{ // user enters both information correctly
      const groupID = genRandom();
      // backdoor token if userId is not authenticated (only during development)
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      const db = firebase.database().ref();
      // create a string of DD/MM/YYYY
      const moment = require('moment')
      const today = moment().format('YYYY/MM/DD').split('/').join('')
      const dateDict = {}
      dateDict[today] = 0
      console.log(`today's date is ${today}`)
      db.child('/groups/'+groupID).once("value")
        .then(snapshot => {
          if(!snapshot.val()) {
            db.child('/groups/'+groupID+'/groupName').set(this.state.groupName);
            db.child('/groups/'+groupID+'/goal').set(this.state.groupHabit);
            db.child('/groups/'+groupID+'/groupColor').set(this.state.groupColor);
            db.child('/groups/'+groupID+'/groupFreq').set(this.state.groupFreq);
            db.child('/groups/'+groupID+'/groupID').set(groupID);
            db.child('/groups/'+groupID+'/streak').set(0);
            // create a userId reference to a list of dates
            db.child('/groups/'+groupID+'/groupMemberIds/'+ userId).set(dateDict);
          }
        }).then(
          this.props.navigation.navigate('Dashboard')
        )
    }
  }

  componentDidMount() {
    const groupArray  = [];
    firebase.database().ref('/groups').on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        groupArray.push(childSnapshot.toJSON());
      });
    });
    this.setState({groups: groupArray});
  }

  render() {
    

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Provider>
          <Portal>
            <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
              <Dialog.Title>Group successfully created!</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Your Group ID is {this.state.groupID}. Share it with your friends so you can meet your goals together!</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          </Provider>
          <TextInput label='Group Name' 
                      value={this.state.groupName} 
                      type="outlined"
                      
                      style={styles.field}
                      onChangeText={text => this.setState({groupName:text})} />
          <TextInput label='What habit are you working toward?' 
                      value={this.state.groupHabit} 
                      type="outlined"
                      
                      style={styles.field}
                      onChangeText={text => this.setState({groupHabit:text})} /> 
          <Card style={styles.card}>
            <Card.Content>
              <Subheading style={styles.subheading}>I want to complete this habit...</Subheading>
              <RadioButton.Group onValueChange={newValue => this.setState({groupFreq:newValue})}
                                  value={this.state.groupFreq}>
                <View style={styles.row}>
                  
                  <RadioButton.Android value="daily" />
                  <Text style={styles.options}>Daily</Text>
                  <RadioButton.Android value="weekly" />
                  <Text style={styles.options}>Weekly</Text>
                  
                </View>
                </RadioButton.Group>     
            </Card.Content>
          </Card>  
          <Card style={styles.card}>
            <Card.Content>
              <Subheading style={styles.subheading}>My group color will be...</Subheading>
              <RadioButton.Group onValueChange={newValue => this.setState({groupColor:newValue})}
                                  value={this.state.groupColor}>
                <View style={styles.row}>
                  <RadioButton.Android value="red"/>
                  <Text style={styles.options}>Red</Text>
                  <RadioButton.Android value="orange"/>
                  <Text style={styles.options}>Orange</Text>
                  <RadioButton.Android value="green"/>
                  <Text style={styles.options}>Green</Text>
                  
                </View>
                <View style={styles.row}>
                  <RadioButton.Android value="blue"/>
                  <Text style={styles.options}>Blue</Text>
                  <RadioButton.Android value="purple"/>
                  <Text style={styles.options}>Purple</Text>
                  <RadioButton.Android value="pink"/>
                  <Text style={styles.options}>Pink</Text>
                  
                </View>
                </RadioButton.Group>     
            </Card.Content>
          </Card>
          <Button mode="contained" dark="true" onPress={this.handleSubmit} style={styles.button}>
            SAVE
          </Button>
          <Button mode="contained" dark="true" onPress={this.gotTodashboard} style={styles.button}>
            CANCEL
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


/*

<RadioButton.Item label="Daily" value="daily" style={styles.options}/>
              <RadioButton.Item label="Weekly" value="weekly" style={styles.options}/>
              <RadioButton.Item label="Monthly" value="monthly" style={styles.options}/>





const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button : {
    margin: 2,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: 50,
    margin: 12,
    fontSize: 18,
    // TODO: ADD a fontFamily later
    color: "#FF9893",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateDropdown: {
    height: 50,
    margin: 12,
    fontSize: 18,
    // TODO: ADD a fontFamily later
    color: "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
  }
});*/
export default CreateGroup;