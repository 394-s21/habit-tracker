import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions} from 'react-native';
import Streak from './CommonCompStreak';
import CommonCompGroupUserList from './CommonCompGroupUserList';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

//const windowWidth = useWindowDimensions().width;
//const cardWidth = windowWidth;
//const windowHeight = useWindowDimensions().height;
const RightContent = () => <Text style={styles.streak}>4</Text>

class ExperimentalGroupCard extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
          streak: 1,
          ratio: "2/6",
          personalGoals: "1 Lesson ",
    };
    }

    render() {
        return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="LEARN REACT NATIVE" subtitle="Completed: 1/6" right={RightContent}/> 
            </Card>
        </View>
        );
    }
}

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
    //justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    //width: {width}*0.85,
    //borderWidth:5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExperimentalGroupCard;
