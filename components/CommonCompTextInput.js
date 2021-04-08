import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Input } from 'react-native-elements';

const CommonCompTextInput = ({placeHolderText}) => {
  const [text, onChangeText] = React.useState();
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeHolderText}
        placeholderTextColor="#FF9893"
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    fontSize: 36,
    fontFamily: "Inter",
    color: "#FF9893",
    fontStyle: 'italic',
  },
});

export default CommonCompTextInput;