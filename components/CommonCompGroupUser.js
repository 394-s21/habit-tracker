import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GroupUser = ({groupUserName}) => (
    <TouchableOpacity style={styles.userButton}>
      <Text style={styles.userText}>
        {groupUserName}
      </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    userButton: {
      flex: 1,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      height: 60,
      padding: 10,
      minWidth: 90,
      maxWidth: 90,
      backgroundColor: '#E9E9E9',
    },
    userText:{
      color: '#000',
      fontSize: 14,
      textAlign: 'center',
    },
  });

  export default GroupUser;