import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Streak from './CommonCompStreak';
import CommonCompGroupUserList from './CommonCompGroupUserList';

const CommonCompGroupCard = ({ groupName, groupMemberNames, goal, streak, groupID }) => {
    const myData = streak; //StreaksData;

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.groupname}>{groupName}</Text>
                <Streak data={myData > 1 ? myData + " days" : myData + " day"} />
            </View>
            <Card.Divider />
            <View style={styles.body}>
                <Text style={styles.goal}>{goal}</Text>
                <Text style={styles.goal}>Group Code: {groupID}</Text>
                <CommonCompGroupUserList groupMembers={groupMemberNames} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    streak: {
        paddingRight: 15,
    },
    cardHeader: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    goal: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray',
        opacity: 0.6,
        paddingBottom: '5%',
    },
    card: {
        marginTop: 10,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        maxHeight: 250,
    },
    groupname: {
        padding: 20,
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CommonCompGroupCard;
