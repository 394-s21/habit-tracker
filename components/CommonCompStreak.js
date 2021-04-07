import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const CommonCompStreak = (prop) => {
  return (
    <button>{prop.numOfStreaks}</button>
  );
};

export default CommonCompStreak;