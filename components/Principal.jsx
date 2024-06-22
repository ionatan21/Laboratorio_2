import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Principal = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
       
      <View style={styles.container}>
      <Text style={styles.title}>Página principal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Producto")}
        >
          <Text style={styles.buttonText}>Registrar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ListarProducto")}
        >
          <Text style={styles.buttonText}>Listar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Aprender")}
        >
          <Text style={styles.buttonText}>Aprender+</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  title: {
    position: "absolute",
    color: "white",
    fontSize: 30,
    top: 0,
    marginTop: 50
  },
  button: {
    backgroundColor: "#871F1F",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
  },
});

export default Principal;
