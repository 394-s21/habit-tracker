import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
import CommonCompTextInput from '../components/CommonCompTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'

class CreateGroup extends Component {

  gotTodashboard = () => {this.props.navigation.navigate('Dashboard')}

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CommonCompTextInput placeHolderText = "Group Name"></CommonCompTextInput> 
        <CommonCompTextInput placeHolderText = "What is your personal habit goal?"></CommonCompTextInput> 
        <Text>I will complete this habit every</Text>
        <DropDownPicker
          items={[
              {label: 'day', value: 'Day'},
              {label: 'other day', value: 'Other day'},
              {label: 'week', value: 'week'},
              {label: 'month', value: 'month'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
        />
        <Text>Group Color</Text>
        <DropDownPicker
          items={[
              {label: 'Blue', value: 'Blue'},
              {label: 'Purple', value: 'Purple'},
              {label: 'White', value: 'White'},
              {label: 'Green', value: 'Green'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
        />
        <Text>Member</Text>
        <Icon name='rowing'/>
        <Button title={"Create Group"}></Button>
        <Button title={"Cancel"} onPress={this.gotTodashboard}></Button>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  areaView: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 300,
      marginTop: 16,
    },
});
export default CreateGroup;