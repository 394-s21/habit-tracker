import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
//import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Dashboard = ({ navigation }) => {
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          
          <TouchableOpacity
            style={styles.button}
            >
            <Text>Create New Group <MaterialCommunityIcons name="plus" /></Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
    
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
      },
  });
export default Dashboard;






