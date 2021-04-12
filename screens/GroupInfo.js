import React, { Component } from 'react';

import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupComponentCard from '../components/CommonCompGroupCard';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Subheading,Card, Button } from 'react-native-paper';

class GroupInfo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        streak : 1,
        personalGoals : "1 Lesson per ",
        frequency : "Day",
        verifyNumber : "2",
        groupMemberNames : ['Jake','Caroline','Patrick','Justin','Jipeng','Daniel','testuse','Onemore'],
        complete : "?"
    };
    }
    
    returnHome = () => {this.props.navigation.navigate("Dashboard")}
    completeDay = () => {this.setState({streak : 2, complete : "!"})}

    render() {
      const stack = createStackNavigator()
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Purple Group</Text>
            <Text style={styles.smolerText}>Learn React Native</Text>
            <View style={{flexDirection:"row"}}>
             <Card style={styles.card}>
               <Card.Content>
                 <Subheading style={styles.subheading}>Group status:</Subheading>
                    <Text style={styles.bigNum}>{this.state.streak}</Text>
                 <Text style={styles.smolerText}>{this.state.frequency} Streak</Text>   
               </Card.Content>
             </Card>

            <Card style={styles.card}>
             <Card.Content>
                <Subheading style={styles.subheading}>Personal Goal:</Subheading>
                
                 <Text style={styles.colorText}>{this.state.personalGoals}{this.state.frequency}</Text>
              
                <Subheading style={styles.subheading}>Needs:</Subheading>
                <Text style={styles.colorText}>{this.state.verifyNumber} people to verify</Text>
              </Card.Content>
            </Card>
            </View>
            <Button mode="contained" dark="true" onPress={this.completeDay} style={styles.button}>
              Completed today{this.state.complete}
            </Button>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
      },
    title: {
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 0,  
      justifyContent: 'center',  
        height: 60,
        fontSize: 30,
        fontWeight: "bold",
        color: "#3DD5F4"
    },
    button: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: '#3DD5F4',
      padding: 10,
      width: 350,
      marginTop: 16,
    },
    bigNum: {
      textAlign: "center",  
        height: 60,
        fontSize: 50,
        fontWeight: "bold",
        color: "#3DD5F4"
    },
    card: {
        marginTop: 0,
        backgroundColor:'white',
        marginHorizontal: 10,
        width: 180
      },
    smolerText: {
        textAlign: "center",
        fontWeight: "100",
        marginBottom: 20
    },
    subheading: {
        textAlign: "center",
        //alignSelf: 'center',
        //justifyContent: 'center', 
        fontWeight: "600",
        height: 35,
      },
    colorText: {
        //fontFamily: "Inter",
        alignSelf: 'center',
        justifyContent: 'center',  
        fontStyle: "italic",
        color: '#3DD5F4'
    }
});
export default GroupInfo;


