import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const CommonCompTextInput = ({placeHolderText}) => {
  const [text, onChangeText] = React.useState(placeHolderText);
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default CommonCompTextInput;