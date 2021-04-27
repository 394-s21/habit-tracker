import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBsYiuNCZdXxYMkelM6kb0TY0MYgY9atMk",
    authDomain: "habit-tracker-ca37d.firebaseapp.com",
    databaseURL: "https://habit-tracker-ca37d-default-rtdb.firebaseio.com",
    projectId: "habit-tracker-ca37d",
    storageBucket: "habit-tracker-ca37d.appspot.com",
    messagingSenderId: "547778785940",
    appId: "1:547778785940:web:19b74dfaaa53ca10637a81",
    measurementId: "G-Z6K7ECH5VX"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])


const Chat = ({route, navigation}) => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    const db = firebase.firestore()
    const {groupID, userID, userFirstName} = route.params
    console.log(`the new page ${groupID}`)
    const chatsRef = db.collection(groupID.toString()) 

    useEffect(() => {
        removeUser()
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        console.log(`user is ${user}`)
        if (user) {
            setUser(JSON.parse(user))
        }
    }

    async function removeUser() {
        const user = await AsyncStorage.removeItem('user')
        console.log(`user ${user} removed`)
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7) 
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }

    if (!user) { // TODO: remove this and read name and userID automatically
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}
export default Chat;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
