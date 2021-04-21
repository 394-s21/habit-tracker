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
    const recentHabit3 = {'You': {20210418:0, 20210419: 1, 20210420: 1, 20210401: 1, 20210402:1}, 'Roy': {20210418:0, 20210419: 1, 20210420: 0, 20210411:1}};
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
    const moment = require('moment')

    //This starts the habit chart at the earliest date any of the users completed the habit
    let firstDay = ''+Math.min(...startingDates);
    firstDay = (new Date(firstDay.substring(0,4), parseInt(firstDay.substring(4,6))-1, firstDay.substring(6)));
    let day = moment(firstDay).format('YYYY/MM/DD')
    const today = moment().format('YYYY/MM/DD')

    //datesSinceFirstDay is an array that holds all the dates since the earliest date recorded
    const datesSinceFirstDay = [day.split('/').join('')];
    let count = 0;
    while(today !== day && count < 100){
        day = moment(day).add(1, 'days').format('YYYY/MM/DD');
        datesSinceFirstDay.push(day.split('/').join(''))
        count = count + 1;
    }
    
    //Outer loops through the users
    //inner loops through all dates and checks if user completed habit on that date
    const userDataList = []
    for(var usrData in dataList){
        let oneUsersData = []
        for(var date in datesSinceFirstDay) {
            if (dataList[usrData].hasOwnProperty(datesSinceFirstDay[date])) {
                oneUsersData.push(dataList[usrData][datesSinceFirstDay[date]])
            } else {
                oneUsersData.push(0)
            }
        }
        userDataList.push(oneUsersData)
    }
    //console.log(userDataList)




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
          {mapUserData(userDataList, groupColor)}
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