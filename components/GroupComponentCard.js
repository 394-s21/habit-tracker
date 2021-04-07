import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Streak from '../components/CommonCompStreak';
import CommonCompGroupUserList from '../components/CommonCompGroupUserList';

const GroupComponentCard = ({groupName, groupMemberNames, goal, streak}) => {
  const myData = streak; //StreaksData;

  return(
  <View>
  <Card>
    <View style={styles.cardHeader}>
      <Card.Title style={styles.groupname}>{groupName}</Card.Title>
      <Streak data = {myData.data > 1? myData.data  + " days" : myData.data  + " day"}/>
    </View>
    <Card.Divider/>
    <View style={styles.body}>
      <Text style={styles.goal}>{goal}</Text>
      <CommonCompGroupUserList groupMembers={groupMemberNames}/>
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
