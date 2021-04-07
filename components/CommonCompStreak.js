import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const CommonCompStreak = (prop) => {
  return (
    <Button title={prop.numOfStreaks} style={styles.button}/>
  );
};
const styles = StyleSheet.create({
  button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      borderColor: '#3DD5F4',
      padding: 10,
      width: 300,
      marginTop: 16,
    },
});
export default CommonCompStreak;