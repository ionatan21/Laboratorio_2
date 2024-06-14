import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Link = ({style, content, handleclick}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleclick}>
        <Text style={style}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Link;
