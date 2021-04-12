import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import * as Google from 'expo-google-app-auth';
import SocialButton from "../components/CommonCompGoogleSignIn"

import firebase from 'firebase'
import {firebaseConfig} from '../config'

firebase.initializeApp(firebaseConfig)
class Login extends Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId: "547778785940-v0n3uo175femd29eg82ktjfmtpkqiqol.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  render() {
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <SocialButton
        buttonTitle='Sign In With Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea' 
        onPress = {() => this.signInWithGoogleAsync()}
        />
    </SafeAreaView>);
  }
}
export default Login;