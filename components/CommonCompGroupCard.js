import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import CommonCompGroupUserList from '../components/CommonCompGroupUserList';
import colorMap from '../utils/color';

const CommonCompGroupCard = ({goal, streak, groupColor, groupMemberNames}) => {
  const RightContent = () => <Text style={styles.streak}>{streak}</Text>

  return(
      <View style={styles.container}>
          <Card style={{backgroundColor: colorMap[groupColor]}}>
              <Card.Title title={goal} subtitle="Completed: 1/6" right={RightContent}/> 
              <CommonCompGroupUserList groupMembers={groupMemberNames} />
          </Card>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
export default CommonCompGroupCard;
