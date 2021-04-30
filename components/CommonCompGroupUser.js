import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CommonCompGroupUser = ({memberUserName}) => (
    <View style={styles.userButton}>
      <Text style={styles.userText}>
        {memberUserName}
      </Text>
    </View>
);

const styles = StyleSheet.create({
  userButton: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: 27,
    paddingBottom: 7,
    padding: 7,
    backgroundColor: '#E9E9E9',
  },
  userText:{
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CommonCompGroupUser;