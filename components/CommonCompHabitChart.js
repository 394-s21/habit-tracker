import React, { useState, useEffect } from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';

const createSquares = arr => (arr.map(done => (
        <View style={styles.[done ? 'doneSquare': 'whiteSquare']}></View>
    )));

const gridRow = (row) => {
  return (
    <View style={styles.horizontalContainer}>
      {createSquares(row)}
    </View>
  );
};

const mapUserData = users => (users.map(user => (
        gridRow( user['recent'])
    )));

const mapUserNames = users => (users.map(user => (
    <View style={styles.textContainer}>
      <Text style={styles.paragraph}>
      {user['name']}
      </Text>
    </View>
)));

const CommonCompHabitChart = ({ groupMembersData }) => {

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
          {mapUserData(groupMembersData)}
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
  doneSquare: {
    ...gridSquareBase,
    backgroundColor: '#3DD5F4',
  },
  whiteSquare: {
    ...gridSquareBase,
    backgroundColor: 'white',
  }
});

export default CommonCompHabitChart;