import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Button from "./Button";
import { auth, db } from "../firebase";

const Registro = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [comprobarContrasena, setComprobarContrasena] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(correoElectronico, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario registrado:", user);

        return db.collection('User').doc(user.uid).set({
          Nombre: nombreCompleto,
          Correo: correoElectronico,
          Password: contrasena,
          uid: user.uid,
        });
      })
      .then(() => {
        console.log("Datos del usuario guardados en Firestore");
        navigation.navigate("Producto");
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
        />
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        <Text style={styles.label}>Comprobar contraseña</Text>
        <TextInput
          style={styles.input}
          value={comprobarContrasena}
          onChangeText={setComprobarContrasena}
          secureTextEntry
        />
        <Button
          handleClick={submitHandler}
          textStyle={styles.buttonStyles}
          content={"Registrarse"}
          buttonStyle={styles.buttonContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
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
    backgroundColor: "white",
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

export default Registro;
