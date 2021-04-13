import * as React from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const grid = [{'name': 'jake', 'recent': []},{},{},{}]
const testarr = [1,0,0,1,1,0,1]
const testarr2 = [0,1,0,1,1,1,0]

const createSquares = arr => (arr.map(done => (
        <View style={styles.[done ? 'doneSquare': 'whiteSquare']}></View>
    )));

const gridRow = (name, row) => {
  return (
    <View style={styles.horizontalContainer}>
      <Text style={styles.paragraph}>
      {name}
      </Text>
      {createSquares(row)}
    </View>
  );
};

const mapUsers = users => (users.map(user => (
        gridRow(user['name'], user['recent'])
    )));

export default function App() {

  const recentData = [{'name': 'test', 'recent': [1,0,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,0]}, {'name': 'test1', 'recent': [1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,   1,0,0]}, {'name': 'test2', 'recent': [1,1,1,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,1,1]}];

  const recentData1 = [{'name': 'test2', 'recent': [1]}, {'name': 'jake', 'recent': [0]}, {'name': 'johnathon', 'recent': [1]}];
  return (
    <View>
    <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
      <View style={styles.container}>
        {mapUsers(recentData)}
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
    backgroundColor: 'black',
    padding: 8,
  },
  paragraph: {
    width: 50,
    fontSize: 14,
    marginRight: 20,
    textAlign: 'center',
    color: 'white',
  },
  doneSquare: {
    ...gridSquareBase,
    backgroundColor: 'purple',
  },
  whiteSquare: {
    ...gridSquareBase,
    backgroundColor: 'white',
  }
});
