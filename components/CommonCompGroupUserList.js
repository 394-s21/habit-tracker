import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CommonCompGroupUser from './CommonCompGroupUser';


const CommonCompGroupUserList = ({ groupMembers }) => {

    return (
        <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal">
                <View style={styles.groupUserList}>
                    {groupMembers.map(member => <CommonCompGroupUser key={member} memberUserName={member} />)}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    groupUserList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default CommonCompGroupUserList;