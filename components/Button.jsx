import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Button = ({ handleClick, textStyle, buttonStyle, content }) => {
  return (
    <View style={buttonStyle}>
      <TouchableOpacity onPress={handleClick}>
        <Text style={textStyle}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
