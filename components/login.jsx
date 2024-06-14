import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { auth, db } from "../firebase";
import Button from "./Button";
import Input from "./Input";
import { TouchableOpacity } from "react-native";

const Login = ({ navigation }) => {
  const handleCreateAccount = () => {
    // Lógica para manejar la creación de una nueva cuenta
    navigation.navigate("Registro");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
      })
      .then(() => {
        navigation.navigate("Producto");
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <View style={styles.inputsContainer}>
          <View style={styles.Inputcontainer}>
            <Input
              icon={require("../assets/envelope.png")}
              placeholder="E-mail"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.Inputcontainer}>
            <Input
              icon={require("../assets/lock.png")}
              placeholder="Contraseña"
              onChangeText={setPassword}
              hide={true}
            />
          </View>
        </View>
        <Button
          handleClick={submitHandler}
          textStyle={styles.buttonStyles}
          content={"Iniciar sesión"}
          buttonStyle={styles.buttonContainer}
        />
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.link}>Crear cuenta nueva Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.link}>¿Olvidó contraseña?</Text>
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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    overflow: "hidden",
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.7,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    width: 350,
    fontSize: 16,
    marginVertical: 8,
    color: "white",
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: "black",
    padding: 8,
    width: 350,
    borderRadius: 4,
    marginVertical: 10,
  },
  link: {
    color: "#fff",
    marginTop: 16,
    textAlign: "center",
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
  inputsContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 329,
  },
  Inputcontainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
    height: 20,
  },
});

export default Login;
