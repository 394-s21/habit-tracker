import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, ListItem, Button, Icon, Header,Image } from 'react-native-elements';
//import Streak from './CommonCompStreak';
//import CommonCompGroupUserList from './CommonCompGroupUserList';
import favicon from '../assets/favicon';
const CommonCompHeader =  ({pageName}) => {
    
    return (
            <Header 
                leftComponent={<View><Text h3>CoSava</Text><Text>{pageName}</Text></View>}
                rightComponent={<Image source={{uri: favicon}}
                                style={{width: 50, height: 50}}/>}/>
        );

    
}

export default CommonCompHeader;