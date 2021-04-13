import firebase from "firebase/app";
import "firebase/database";

// set up habit-tracker-ca37d
const firebaseConfig = {
  apiKey: "AIzaSyBsYiuNCZdXxYMkelM6kb0TY0MYgY9atMk",
  authDomain: "habit-tracker-ca37d.firebaseapp.com",
  databaseURL: "https://habit-tracker-ca37d-default-rtdb.firebaseio.com",
  projectId: "habit-tracker-ca37d",
  storageBucket: "habit-tracker-ca37d.appspot.com",
  messagingSenderId: "547778785940",
  appId: "1:547778785940:web:19b74dfaaa53ca10637a81",
  measurementId: "G-Z6K7ECH5VX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
export { firebase };