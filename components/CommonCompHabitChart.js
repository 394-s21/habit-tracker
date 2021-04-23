import React, { useState, useEffect } from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';
import GroupInfo from '../screens/GroupInfo';
import moment from 'moment';
import {firebase} from '../utils/firebase';
import 'firebase/database';

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
        gridRow( user, clr)
    )));

const mapUserNames = users => (users.map(user => (
    <View style={styles.textContainer} key={user}>
      <Text style={styles.paragraph}>
      {user}
      </Text>
    </View>
)));

const CommonCompHabitChart = ({ groupMembersData, groupMembersNames, groupColor, groupID }) => {
    const nameList = groupMembersNames;
    const dataList = [];
    const startingDates = [];
    for (var key in groupMembersData) {
        if (groupMembersData.hasOwnProperty(key)) {     
            //nameList.push(key);

            startingDates.push(Math.min(...Object.keys(groupMembersData[key])));
            dataList.push(groupMembersData[key]);
        }
    }
    const moment = require('moment')

    console.log('------------------------')

    //This starts the habit chart at the earliest date any of the users completed the habit
    let firstDay = ''+Math.min(...startingDates);
    //attempt to get the earliest date in YYYYMMDD format
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

    //calculatestreak
    var streakLength = 0;
    if (userDataList.length > 0){
    for(var i = userDataList[0].length-1; i >= 0; i --){
        let everyone = true;
        for(var j in userDataList){
            everyone = everyone && userDataList[j][i];
        }

        if(everyone){
            streakLength += 1;
        }
        else if(i != userDataList[0].length-1){
            break
        }
    }
    const db = firebase.database().ref('/groups/'+groupID);
    db.child('/streak').set(streakLength);
    }

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