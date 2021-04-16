import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

const CommonCompJoinGroup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupIDText, onChangeText] = React.useState("");
  const [goalText, onChangeGoal] = React.useState("");
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.groupID}>
            <Text style={styles.description}>Group ID</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={groupIDText}
            />
            </View>
            <View style={styles.groupID}>
            <Text style={styles.description}>Goal</Text>
            <TextInput
            style={styles.input}
            onChangeGoal={onChangeGoal}
            value={goalText}
            />
            </View>
            <View style={styles.cancelJoin}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Join</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Join Group</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    description: {
        justifyContent: "center",
        paddingTop: '9%',
    },
    groupID: {
        flexDirection: "row",
        //borderWidth: 5,
    },
    
input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        },
cancelJoin: {
flexDirection: "row",
borderWidth: 5,
justifyContent: "space-between",
},
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
// import React from "react";
// import { SafeAreaView, StyleSheet, TextInput } from "react-native";
// import { Card, ListItem, Button, Icon } from 'react-native-elements';

// const CommonCompJoinGroup = () => {
//   const [text, onChangeText] = React.useState("Useless Text");
//   const [number, onChangeNumber] = React.useState(null);

//   return (
//     <Card>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumber}
//         value={number}
//         placeholder="useless placeholder"
//         keyboardType="numeric"
//       />
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//   },
// });

export default CommonCompJoinGroup;