import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, Text, Alert, View} from 'react-native';
import {Card, Button} from 'react-native-elements';
import CommonCompTextInput from '../components/CommonCompTextInput';
import DropDownPicker from 'react-native-dropdown-picker';

class CreateGroup extends Component {

  gotTodashboard = () => {this.props.navigation.navigate('Dashboard')}

  render() {
    return (
      <Card>
        <CommonCompTextInput placeHolderText = "Group Name"></CommonCompTextInput> 
        <CommonCompTextInput placeHolderText = "What is your personal habit goal?"></CommonCompTextInput> 
        <Text style={styles.text}>I will complete this habit every</Text>
        <DropDownPicker style={styles.dateDropdown}
          items={[
              {label: 'day', value: 'Day'},
              {label: 'other day', value: 'Other day'},
              {label: 'week', value: 'week'},
              {label: 'month', value: 'month'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40, textAlign: 'center', color:'#FFFFFF'}}
          onChangeItem={item => console.log(item.label, item.value)}
        />
        <Text style={styles.text}>Group Color</Text>
        <DropDownPicker style={styles.dateDropdown}
          items={[
              {label: 'Blue', value: 'Blue'},
              {label: 'Purple', value: 'Purple'},
              {label: 'White', value: 'White'},
              {label: 'Green', value: 'Green'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40, textAlign: 'center', color:'#FF9893'}}
          onChangeItem={item => console.log(item.label, item.value)}
        />
        <Button style={styles.button} title={"Add People To Your Group"}></Button>
        <Button style={styles.button} title={"Save"}></Button>
        <Button style={styles.button} title={"Cancel"} onPress={this.gotTodashboard}></Button>
      </Card>
    );
  }
}
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
    fontFamily: "Inter",
    color: "#FF9893",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateDropdown: {
    height: 50,
    margin: 12,
    fontSize: 18,
    fontFamily: "Inter",
    color: "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
export default CreateGroup;