import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const CommonCompGroupCard = ({goal, streak, groupColor}) => {
  const RightContent = () => <Text style={styles.streak}>{streak}</Text>

  const colorMap = {'pink': '#FF9893', 'red': '#cb4154', 'blue': '#ADD8E6', 'green': '#CAE7C1', 'purple': '#B19CD9', 'yellow': '#FDFD96'}

  return(
      <View style={styles.container}>
          <Card style={{backgroundColor: colorMap[groupColor]}}>
              <Card.Title title={goal} subtitle="Completed: 1/6" right={RightContent}/> 
          </Card>
      </View>
     
    //More complex card
    //return (
    //    <View style={styles.card}>
    //        <View style={styles.cardHeader}>
    //            <Text style={styles.groupname}>{groupName}</Text>
    //            <Streak data={myData > 1 ? myData + " days" : myData + " day"} />
    //        </View>
    //        <Card.Divider />
    //        <View style={styles.body}>
    //            <Text style={styles.goal}>{goal}</Text>
    //            <Text style={styles.goal}>Group Code: {groupID}</Text>
    //            {/* <CommonCompGroupUserList groupMembers={groupMemberNames} /> */}
    //        </View>
    //    </View>
    );

};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFEFD5',
  },
  streak: {
    fontSize: 18,
    paddingRight: '5%',
  },
  container: {
    flex: 1,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CommonCompGroupCard;