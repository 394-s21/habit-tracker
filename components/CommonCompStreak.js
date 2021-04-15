import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GroupInfo from "../screens/GroupInfo";

class CommonCompStreak extends Component {
  render() {
    const {data} = this.props;
    return (
        <View style = {styles.button}>
            <Text style = {styles.buttonText}>{data}</Text>
        </View>
    );
  }  
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: 72,
    height: 28,
    backgroundColor: "#9C0ECE",
    borderRadius: 100
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  }

});
export default CommonCompStreak;