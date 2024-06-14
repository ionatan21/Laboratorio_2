import React, { useRef, useEffect } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const blurAnim = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(blurAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View>
      <Animated.View
        style={[
          styles.box,
          {
            opacity: opacityAnim,
          },
        ]}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: size, height: size }}
          alt="LOGO"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Logo;
