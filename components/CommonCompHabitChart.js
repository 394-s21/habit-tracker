import React, { useState, useEffect } from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';
import GroupInfo from '../screens/GroupInfo';
import moment from 'moment';

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
        <View style={squareStyles[parseInt(done) ? 'doneSquare': 'whiteSquare']}></View>
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
        gridRow( user, clr)
    )));

const mapUserNames = users => (users.map(user => (
    <View style={styles.textContainer} key={user}>
      <Text style={styles.paragraph}>
      {user}
      </Text>
    </View>
)));

const CommonCompHabitChart = ({ groupMembersData, groupColor }) => {
    const recentHabit3 = {'You': {20210418:0, 20210419: 1, 20210420: 1}, 'Roy': {20210418:0, 20210419: 1, 20210420: 0}};
    const nameList = [];
    const dataList = [];
    const dataList1 = [];
    const startingDates = [];
    for (var key in recentHabit3) {
        if (recentHabit3.hasOwnProperty(key)) {     
            nameList.push(key);
            dataList1.push(Object.values(recentHabit3[key])); 

            startingDates.push(Math.min(...Object.keys(recentHabit3[key])));
            dataList.push(recentHabit3[key]);
        }
    }
    //This starts the habit chart at the earliest date any of the users completed the habit
    let firstDay = ''+Math.min(...startingDates);
    const moment = require('moment')
    firstDay = (new Date(firstDay.substring(0,4), firstDay.substring(4,6), firstDay.substring(6)));
    const today = moment().format('YYYY/MM/DD').replaceAll("/",",")
    let day = moment(firstDay).format('YYYY/MM/DD').replaceAll("/","")
    const datesSinceFirstDay = [day];
    let count = 100;
    while(today !== day && count < 100){
        moment(day).add(1, 'days').format('YYYY/MM/DD').replaceAll("/","");
        datesSinceFirstDay.push(day)
        console.log(day)
        count = count + 1;
    }
    currentDate = 0;




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
          {mapUserNames(nameList)}
        </View>
        <View style={styles.container}>
          {mapUserData(dataList1, groupColor)}
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
    backgroundColor: 'grey',
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