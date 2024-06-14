import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

const Input = ({ icon, placeholder, onChangeText, hide }) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={styles.icons}
        alt="LOGO"
      ></Image>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#000"
        onChangeText={onChangeText}
        secureTextEntry={hide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: 329,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 35
  },
  icons: {
    marginRight: 10,
    width: 27,
    height: 30,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 20,
    width: 299,
    height: 21,
    borderColor: "transparent",
  },
});

export default Input;
