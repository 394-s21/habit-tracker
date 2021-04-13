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
      newGroupID: null
    }
  }

  gotTodashboard = () => {this.props.navigation.navigate('Dashboard')}

  handleSubmit = () => {
    console.log('will validate group ID, add person to group if it matches, add group/habit to person profile');
    console.log('group ID: ',this.state.newGroupID)
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TextInput label='Group ID' 
                      value={this.state.newGroupID} 
                      type="outlined"
                      
                      style={styles.field}
                      onChangeText={text => this.setState({newGroupID:text})} />
          
          <Button mode="contained" dark="true" onPress={this.handleSubmit} style={styles.button}>
            JOIN
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
export default CreateGroup;