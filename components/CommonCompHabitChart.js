import * as React from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

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

export default function App() {

  const recentHabit = [{'name': 'jake', 'recent': [1,0,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,0]}, {'name': 'test1', 'recent': [1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,   1,0,0]}, {'name': 'test2', 'recent': [1,1,1,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,1,1]}];

  return (
    <View>
    <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
      <View style={styles.horizontalContainer}>
        <View style={styles.container}>
          {mapUserNames(recentHabit)}
        </View>
        <View style={styles.container}>
          {mapUserData(recentHabit)}
        </View>
    </View>
    </ScrollView>
    </View>
  );
}

const gridSquareBase = {
    margin: 0,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
    height: 20,
    width: 20,
  };

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },
    container: {
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    marginTop: 25,
    backgroundColor: 'white',
    padding: 0,
  },
  paragraph: {
    fontSize: 14,
    marginRight: 15,
    marginLeft:10,
    textAlign: 'center',
    color: 'black',
  },
  textContainer: {borderColor: 'black',
  borderBottomWidth: 1,
   borderTopWidth: 1,
    marginLeft:20},
  doneSquare: {
    ...gridSquareBase,
    backgroundColor: 'purple',
  },
  whiteSquare: {
    ...gridSquareBase,
    backgroundColor: 'white',
  }
});
