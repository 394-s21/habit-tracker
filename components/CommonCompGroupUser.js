import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CommonCompGroupUser = ({memberUserName}) => (
    <TouchableOpacity style={styles.userButton}>
      <Text style={styles.userText}>
        {memberUserName}
      </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    userButton: {
      flex: 1,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      height: 27,
      padding: 10,
      backgroundColor: '#E9E9E9',
    },
    userText:{
      color: '#000',
      fontSize: 14,
      textAlign: 'center',
    },
  });

  export default CommonCompGroupUser;