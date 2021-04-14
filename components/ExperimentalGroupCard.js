import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Streak from './CommonCompStreak';
import CommonCompGroupUserList from './CommonCompGroupUserList';

const ExperimentalGroupCard = ({groupName, ratio, streak, color}) => {
    const completed = "Completed: ".concat({ratio});
    return(
    <Card>
        <View>
            <Text>{groupName}</Text>
            <Text>{streak}</Text>
        </View>
        <Text>Completed: {ratio}</Text>
      {/* <Card.Title style={{borderWidth: 5}}title={groupName} subtitle={ratio}/> */}
      {/* <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content> */}
    </Card>
    );
    };

const styles = StyleSheet.create({
    cardHeader: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'flex-box',
        bottom: '5%',
      },
    card: {
        //color: {color},
        justifyContent: "space-between",
        flexDirection: "row",
        borderWidth: 5,
    },

})
  
//   export default MyComponent;

// const ExperimentalGroupCard = ({goal, streak, completed}) => {
//   const myData = streak; //StreaksData;

//   return(
//   <View>
//   <Card>
//     <View style={styles.cardHeader}>
//       <Card.Title style={styles.groupname}>{groupName}</Card.Title>
//       <Streak data = {myData.data > 1? myData.data  + " days" : myData.data  + " day"}/>
//     </View>
//     <Card.Divider/>
//     <View style={styles.body}>
//       <Text style={styles.goal}>{goal}</Text>
//       <CommonCompGroupUserList groupMembers={groupMemberNames}/>
//     </View>
//   </Card>
//   </View>
//     );

// };

// const styles = StyleSheet.create({
//   streak: {
//     paddingRight: 5,
//   },
//   cardHeader: {
//     justifyContent: 'space-between',
//     flex: 1,
//     flexDirection: 'row',
//     //alignItems: 'flex-box',
//     bottom: '5%',
//   },
//   body: {
//     flexDirection: 'column',
//     //alignItems: 'flex-box',
//   },
//   goal: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'gray',
//     opacity: 0.6,
//     paddingBottom: '5%',
//   },
//   // card: {
//   //   //borderLeftWidth: 5,    
//   // },
//   groupname: {
//     paddingLeft: 10,
//     marginLeft: -10,
//     fontSize: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

export default ExperimentalGroupCard;
