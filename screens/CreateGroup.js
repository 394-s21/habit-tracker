import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, Alert, View, ScrollView} from 'react-native';
//import {Card, Button} from 'react-native-elements';
import CommonCompTextInput from '../components/CommonCompTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, RadioButton,Text, Subheading,Card, Button } from 'react-native-paper';
//import { useFormik } from 'formik';
//import * as yup from 'yup';
//import Form from '../components/Form';
//import { makeStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';


class CreateGroup extends Component {


  constructor(props) {
    super(props);
    this.state= {
      groupName: "",
      groupHabit: "",
      groupFreq: "daily",
      groupColor: "red",
      groupID: null,
      groups: [{'groupName': 'School of Rock',
      'goal': 'Practice Guitar',
      'groupMemberNames': ['Justin','Roy'],
      'streak': 4,
      'groupColor': 'purple',
      'groupFreq': 'weekly',
      'groupID': 15781}],
      idCount: 15782
    }
  }

  gotTodashboard = () => {this.props.navigation.navigate('Dashboard')}

  handleSubmit = () => {
    console.log('will validate input, upload to firebase, generate group ID here');
    console.log('group Name: ',this.state.groupName);
    console.log('group habit: ',this.state.groupHabit);
    console.log('group freq: ',this.state.groupFreq);
    console.log('group color', this.state.groupColor);
    newGroup = {'groupName': this.state.groupName,
                'goal': this.state.groupHabit,
                'groupMemberNames': [],
                'streak': 0,
                'groupColor': this.state.groupColor,
                'groupFreq': this.state.groupFreq,
                'groupID': this.state.idCount};
    this.setState(
      {groups: [...this.state.groups, newGroup]}
    );
    this.setState((state, props) => {
      return {idCount: this.state.idCount + 1};
    });
    this.props.navigation.navigate('Dashboard',{params: {groups: this.state.groups}});
  }

  render() {
    

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TextInput label='Group Name' 
                      value={this.state.groupName} 
                      type="outlined"
                      
                      style={styles.field}
                      onChangeText={text => this.setState({groupName:text})} />
          <TextInput label='What habit are you working toward?' 
                      value={this.state.groupHabit} 
                      type="outlined"
                      
                      style={styles.field}
                      onChangeText={text => this.setState({groupHabit:text})} /> 
          <Card style={styles.card}>
            <Card.Content>
              <Subheading style={styles.subheading}>I want to complete this habit...</Subheading>
              <RadioButton.Group onValueChange={newValue => this.setState({groupFreq:newValue})}
                                  value={this.state.groupFreq}>
                <View style={styles.row}>
                  <RadioButton value="daily"/>
                  <Text style={styles.options}>Daily</Text>
                  <RadioButton value="weekly"/>
                  <Text style={styles.options}>Weekly</Text>
                  <RadioButton value="monthly"/>
                  <Text style={styles.options}>Monthly</Text>
                  
                </View>
                </RadioButton.Group>     
            </Card.Content>
          </Card>  
          <Card style={styles.card}>
            <Card.Content>
              <Subheading style={styles.subheading}>My group color will be...</Subheading>
              <RadioButton.Group onValueChange={newValue => this.setState({groupColor:newValue})}
                                  value={this.state.groupColor}>
                <View style={styles.row}>
                  <RadioButton value="red"/>
                  <Text style={styles.options}>Red</Text>
                  <RadioButton value="yellow"/>
                  <Text style={styles.options}>Yellow</Text>
                  <RadioButton value="green"/>
                  <Text style={styles.options}>Green</Text>
                  
                </View>
                <View style={styles.row}>
                  <RadioButton value="blue"/>
                  <Text style={styles.options}>Blue</Text>
                  <RadioButton value="purple"/>
                  <Text style={styles.options}>Purple</Text>
                  <RadioButton value="pink"/>
                  <Text style={styles.options}>Pink</Text>
                  
                </View>
                </RadioButton.Group>     
            </Card.Content>
          </Card>
          <Button mode="contained" dark="true" onPress={this.handleSubmit} style={styles.button}>
            SAVE
          </Button>
          <Button mode="contained" dark="true" onPress={this.gotTodashboard} style={styles.button}>
            CANCEL
          </Button>
        </ScrollView>
      </SafeAreaView>
      
      

    );
  }
}


const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: '#3DD5F4'
  },
  options: {
    paddingTop: 10
  },
  card: {
    marginTop: 15,
    backgroundColor:'white',
    width: 350
  },
  row: {
    justifyContent: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 13
  },
  subheading: {
    fontWeight: "600",
    height: 35,
    width: 350
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  field: {
    marginTop: 15,
    height: 55,
    width: 350,
    padding: 5,
    backgroundColor: 'white',
  },
  fieldContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
  }
});

export default CreateGroup;

/*

<RadioButton.Item label="Daily" value="daily" style={styles.options}/>
              <RadioButton.Item label="Weekly" value="weekly" style={styles.options}/>
              <RadioButton.Item label="Monthly" value="monthly" style={styles.options}/>





const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button : {
    margin: 2,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: 50,
    margin: 12,
    fontSize: 18,
    // TODO: ADD a fontFamily later
    color: "#FF9893",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateDropdown: {
    height: 50,
    margin: 12,
    fontSize: 18,
    // TODO: ADD a fontFamily later
    color: "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
  }
});*/
