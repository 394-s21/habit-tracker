import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const CompleteHabit = ({ initcompleted, select }) => {
    //TODO: Change this to updating database
    const [completed, setCompleted] = useState(initcompleted);

    return (
        <TouchableOpacity onPress={() => { setCompleted(!completed); }}>
            <Text style={styles.courseText}>
                {completed ? 'Habit Completed!' : 'Completed Habit?'}
            </Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    habitButton: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 60,
        padding: 10,
        minWidth: 90,
        maxWidth: 90,
        backgroundColor: '#e5e5e5',
        borderColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CompleteHabit;