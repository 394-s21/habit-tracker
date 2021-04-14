import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';
import Streak from './CommonCompStreak';
import CommonCompGroupUserList from './CommonCompGroupUserList';

const CommonCompGroupCard = ({groupName, groupMemberNames, goal, streak, groupID}) => {
  const myData = streak; //StreaksData;

  return(
  <View>
  <Card>
    <View style={styles.cardHeader}>
      <Card.Title style={styles.groupname}>{groupName}</Card.Title>
      <Streak data = {myData > 1? myData  + " days" : myData  + " day"}/>
    </View>
    <Card.Divider/>
    <View style={styles.body}>
      <Text style={styles.goal}>{goal}</Text>
      <Text style={styles.goal}>Group Code: {groupID}</Text>
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
    alignItems: 'center',
    bottom: '5%',
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  goal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'gray',
    opacity: 0.6,
    paddingBottom: '5%',
  },
  card: {
    marginLeft: 5,    
  },
  groupname: {
    paddingLeft: 10,
    marginLeft: -10,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CommonCompGroupCard;
