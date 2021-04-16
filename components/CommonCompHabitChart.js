import React, { useState, useEffect } from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';
import GroupInfo from '../screens/GroupInfo';

const createSquares = (arr, clr) => (arr.map(done => {
        const squareStyles = StyleSheet.create({
            doneSquare: {
                ...gridSquareBase,
                backgroundColor: clr,
              },
              whiteSquare: {
                ...gridSquareBase,
                backgroundColor: 'white',
              }
        });
        return(
        <View style={squareStyles[done ? 'doneSquare': 'whiteSquare']}></View>
        );
}));

const gridRow = (row, clr) => {
  return (
    <View style={styles.horizontalContainer}>
      {createSquares(row, clr)}
    </View>
  );
};

const mapUserData = (users, clr) => (users.map(user => (
        gridRow( user['recent'], clr)
    )));

const mapUserNames = users => (users.map(user => (
    <View style={styles.textContainer}>
      <Text style={styles.paragraph}>
      {user['name']}
      </Text>
    </View>
)));

const CommonCompHabitChart = ({ groupMembersData, groupColor }) => {

  //const recentHabit = [{'name': 'test0', 'recent': [1,0,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,0]}, {'name': 'test1', 'recent': [1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,   1,0,0]}, {'name': 'test2', 'recent': [1,1,1,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,1,1]}];

  return (
    <View style={styles.header}>
        <Text style={styles.textheader}>Progress Tracker</Text>
    <View style={styles.horizontalContainer}>
    <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
      <View style={styles.horizontalContainer}>
        <View style={styles.container}>
          {mapUserNames(groupMembersData)}
        </View>
        <View style={styles.container}>
          {mapUserData(groupMembersData, groupColor)}
        </View>
    </View>
    </ScrollView>
    </View>
    </View>
  );
}

const gridSquareBase = {
    margin: 0,
    borderColor: 'black',
    borderWidth: 1,
    height: 30,
    width: 30,
  };

const styles = StyleSheet.create({
  mainContainer: {
      paddingTop: 10,
      paddingBottom: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },
    container: {
    justifyContent: 'center',
    backgroundColor: '#efefef',
    padding: 0,
  },
  paragraph: {
    fontSize: 19,
    marginRight: 15,
    marginLeft:10,
    textAlign: 'center',
    color: 'black',
  },
  textContainer: {borderColor: 'black',
  borderBottomWidth: 1,
  borderTopWidth: 1,
  height: 30,
  marginLeft:20
  },
  textheader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    padding: 10,
  },
});

export default CommonCompHabitChart;