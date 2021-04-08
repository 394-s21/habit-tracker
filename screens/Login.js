import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import SocialButton from "../components/CommonCompGoogleSignIn"

class CreateGroup extends Component {
  signInGoogle = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  render() {
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <SocialButton
        buttonTitle='Sign In With Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea'
        onPress={() => {this.signInGoogle}} />
    </SafeAreaView>);
  }
}
export default CreateGroup;