import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {firebase} from '../utils/firebase';
import 'firebase/database';
import CommonCompGroupUser from './CommonCompGroupUser';

class CommonCompGroupUserList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        usernames: ['loading']
      };
    }

    componentDidMount() {
      var usersArray = [];
      const groupID = this.props.groupID;
      this.setState({usernames: []})

      firebase.database().ref('/').on('value', (snapshot) => {
        const firebaseDB = snapshot.toJSON();
        usersArray = []
        if(firebaseDB.groups.hasOwnProperty(groupID)){
        for (var user in firebaseDB.groups[groupID].groupMemberIds){
            if (firebaseDB.users.hasOwnProperty(user)) {   
                usersArray.push(firebaseDB.users[user].first_name + ' ' + firebaseDB.users[user].last_name);
            }
        }
        this.setState({usernames: usersArray});
    }
      });
      
      
    }
    render() {
      const usernames = this.state.usernames;
      return (
        <View style={this.styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
                <View style={this.styles.groupUserList}>
                    {usernames.map(member => <CommonCompGroupUser key={member} memberUserName={member} />)}
                </View>
            </ScrollView>
        </View>
    );
    }
    

    styles = StyleSheet.create({
        container: {
            marginLeft: 10,
            marginRight: 10,
        },
        groupUserList: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 0,
            marginBottom: 10,
            marginLeft: 10,
        },
    });
};


export default CommonCompGroupUserList;