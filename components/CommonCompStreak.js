import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


class CommonCompStreak extends Component {
  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity>
          <View style = {styles.button}>
            <Text style = {styles.buttonText}>{data}</Text>
          </View>
      </TouchableOpacity>
    );
  }  
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    width: 100,
    height: 28,
    backgroundColor: "#9C0ECE",
    borderRadius: 100
  },
  buttonText: {
    width: 100,
    height: 15,
    fontStyle: 'normal',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  }

});
export default CommonCompStreak;