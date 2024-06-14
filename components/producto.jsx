import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import Button from "./Button";
import { db } from "../firebase";
const Producto = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("Product").doc(codigoProducto).set({
      Nombre: nombreProducto,
      codigoProducto: codigoProducto,
      cantidad: cantidad,
      fechaCaducidad: fechaCaducidad,
    });
    console.log("Agregado correctamente");
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.label}>Nombre Producto</Text>
        <TextInput
          style={styles.input}
          value={nombreProducto}
          onChangeText={setNombreProducto}
        />
        <Text style={styles.label}>Código Producto</Text>
        <TextInput
          style={styles.input}
          value={codigoProducto}
          onChangeText={setCodigoProducto}
        />
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={setCantidad}
        />
        <Text style={styles.label}>Fecha caducidad</Text>
        <TextInput
          style={styles.input}
          value={fechaCaducidad}
          onChangeText={setFechaCaducidad}
        />
        <Button
          handleClick={submitHandler}
          textStyle={styles.buttonStyles}
          content={"Guardar"}
          buttonStyle={styles.buttonContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    color: "white",
  },
  buttonStyles: {
    color: "white",
    fontSize: 24,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#871F1F",
    overflow: "hidden",
    marginTop: 20,
  },
});

export default Producto;
