import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {Card, Button} from 'react-native-paper';
import CommonCompGroupUserList from '../components/CommonCompGroupUserList';
import colorMap from '../utils/color';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import moment from 'moment';

class Dashboard extends Component {
    constructor(props) {
      super(props);

      this.state = {
        groups: [],
        loading: false
      };
      this.props.navigation.setOptions()
    }
  
    createGroup = () => {this.props.navigation.navigate('Create Group')};
    joinGroup = () => {this.props.navigation.navigate('Join Group')};
    viewGroup = (val, clr) => {
      this.props.navigation.navigate('View Group',{groupID: val, groupColor: clr})}
    logoutUser = () => {this.props.navigation.replace('Login')}


    componentDidMount() {
      this.setState({loading: true});
      this.setState({groups: []});
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      firebase.database().ref('/groups').on('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log("goodbye")
          const groupArray = []
          snapshot.forEach(function (childSnapshot) {
            // only display groups that the user is in
            const groupMemberIdJson = childSnapshot.toJSON().groupMemberIds
            if (groupMemberIdJson && groupMemberIdJson.hasOwnProperty(userId)){
              groupArray.push(childSnapshot.toJSON());
            }
          });
          this.setState({loading: false})
          this.setState({groups: groupArray});
        }});
    
    }

    checkHowManyCompleted = (groupMemberIds) => {
        const moment = require('moment');
        const today = moment().format('YYYY/MM/DD').split('/').join('');
        var compCount;
        var count;
        compCount = 0;
        count = 0;
        console.log()
        for (var member in groupMemberIds){
            if (groupMemberIds[member].hasOwnProperty(today) && groupMemberIds[member][today]){
                compCount++;
            }
            count++
        }
        return compCount + "/" + count
    }

    render() {
      const groups = this.state.groups;
      const loading = this.state.loading;
      // const RightContent = () => <Text style={styles.streak}>{streak}</Text>
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 0 }}>
            <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                
            <ScrollView style={{
                alignSelf: 'stretch',
            }}>
              <View style={styles.row}>
                <Button mode="contained" dark="true" onPress={this.createGroup} style={styles.button}>
                  CREATE GROUP
                </Button>
                <Button mode="contained" dark="true" onPress={this.joinGroup} style={styles.button}>
                  JOIN GROUP
                </Button>
              </View>

                {groups.map(group => 
                  <View style={styles.container} key={group.groupID}>
                    <Card 
                      style={{backgroundColor: colorMap[group.groupColor]}} 
                      onPress={() => {this.viewGroup(group.groupID, group.groupColor)}}
                      key={group.groupID}>
                      <Card.Title 
                        title={group.goal} 
                        subtitle={'Completed: ' + this.checkHowManyCompleted(group.groupMemberIds)} right={() => <Text style={styles.streak}>{group.streak + " Days"}</Text>}/> 
                      <CommonCompGroupUserList groupID={group.groupID} />
                    </Card>
                  </View>)}


                <View style={styles.row}>
                  <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.logoutUser}>logout</Button>
                </View>
            </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      );
    }
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  logoutButton: {
    backgroundColor: '#000000',
    marginTop: 26,
    width: "30%",
    marginLeft: 5,
    marginRight: 5
  },
  button: {
      backgroundColor: '#3DD5F4',
      marginTop: 16,
      width: "47%",
      marginLeft: 5,
      marginRight: 5
    },
  streak: {
    fontWeight: 'bold',
    margin: 20,
    fontSize: 24,
  },
  row: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Dashboard;
