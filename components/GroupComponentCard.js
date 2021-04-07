import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Streak from '../components/CommonCompStreak';
import CommonCompGroupUserList from '../components/CommonCompGroupUserList';

const GroupComponentCard = () => {
  const groupMemberNames = ['Jake','Caroline','Patrick','Tony','Jipeng','Daniel','testuse','Onemore'];
  const groupMemberNames2 = ['Joe', "Adam", "Steve", "Megan", "Claire"];
  const StreaksData = [{ // dummy data first. TODO: replace with db call from firebase
    "id" : 1,
    "data" : 3,
  }, {
    "id" : 2,
    "data" : 207,
  }];
  const myData = StreaksData;

    return(
  <View>
  <Card>
    <View style={styles.cardHeader}>
      <Card.Title style={styles.groupname}>Purple Group</Card.Title>
      <Streak data = { myData[0].data  + " days"}/>
    </View>
    <Card.Divider/>
    <View style={styles.body}>
      <Text style={styles.goal}>Learn React Native</Text>
      <CommonCompGroupUserList groupMembers={groupMemberNames}/>
    </View>
  </Card>
  <Card>
    <View style={styles.cardHeader}>
      <Card.Title style={styles.groupname}>Green Group</Card.Title>
      <Streak data = { myData[1].data  + " days"}/>
    </View>
    <Card.Divider/>
    <View style={styles.body}>
      <Text style={styles.goal}>Learn React Native</Text>
      <CommonCompGroupUserList groupMembers={groupMemberNames2}/>
    </View>
  </Card>
  </View>
    );

};

const styles = StyleSheet.create({
  streak: {
    paddingRight: 5,
  },
  cardHeader: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-box',
    bottom: '5%',
  },
  body: {
    flexDirection: 'column',
    alignItems: 'flex-box',
  },
  goal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'gray',
    opacity: 0.6,
    paddingBottom: '5%',
  },
  card: {
    borderWidthLeft: 5,    
  },
  groupname: {
    paddingLeft: 10,
    marginLeft: -10,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
})

export default GroupComponentCard;
