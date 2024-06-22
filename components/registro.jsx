import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Button from "./Button";
import { auth, db } from "../firebase";
import Input from "./Input";
import { useNavigation } from "@react-navigation/native";

const Registro = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [comprobarContrasena, setComprobarContrasena] = useState("");
  const navigation = useNavigation();

  const submitHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(correoElectronico, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario registrado:", user);

        return db.collection("User").doc(user.uid).set({
          Nombre: nombreCompleto,
          Correo: correoElectronico,
          Password: contrasena,
          uid: user.uid,
        });
      })
      .then(() => {
        console.log("Datos del usuario guardados en Firestore");
        navigation.navigate("Principal");
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
        <View style={styles.inputsContainer}>
          <View style={styles.Inputcontainer}>
            <Input
              icon={require("../assets/user-solid.png")}
              placeholder="Nombre completo"
              onChangeText={setNombreCompleto}
              hide={false}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Input
              icon={require("../assets/envelope.png")}
              placeholder="Correo electrónico"
              onChangeText={setCorreoElectronico}
              hide={false}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Input
              icon={require("../assets/lock.png")}
              placeholder="Contraseña"
              onChangeText={setContrasena}
              hide={true}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Input
              icon={require("../assets/lock.png")}
              placeholder="Comprobar contraseña"
              onChangeText={setComprobarContrasena}
              hide={true}
            />
          </View>
        </View>

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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
  },
  Inputcontainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginBottom: 25,
    height: 20,
  },
  inputsContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 329,
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
