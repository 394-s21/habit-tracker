import { Component } from 'react';
import React from "react";
import { View, ActivityIndicator} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';

import SocialButton from "../components/CommonCompGoogleSignIn"

import firebase from 'firebase'
import {firebaseConfig} from '../config'

class Loading extends Component {
  componentDidMount() {
    this.checkIfLoggedIn()
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){ // user exists!
        this.props.navigation.navigate('Dashboard') 
      } else{
        this.props.navigation.navigate('Login')
      }
    })
  }

  render() {
    return (
      <View>
        <ActivityIndicator size = "large" />
      </View>)
  }
}
export default Loading;