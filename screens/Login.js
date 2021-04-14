
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import SocialButton from "../components/CommonCompGoogleSignIn"
import {firebaseConfig} from '../config';
import * as Google from 'expo-google-app-auth';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
class Login extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID 
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      console.log("attemp to sign in with google")
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "547778785940-p85qgnoq304ihoc6m9kf3ntaoob30rdn.apps.googleusercontent.com",
        androidClientId: "547778785940-c4auvl9ajnaba4omhbgrqgkp7aaun0uh.apps.googleusercontent.com",
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        console.log("successful sign in")
        this.props.navigation.replace('Dashboard'); // We use replace to disable user to go back
        return result.accessToken;
      } else {
        console.log("cancelled sign in")
        this.props.navigation.navigate('Login');
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.code)
      return { error: true };
    }
  };

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