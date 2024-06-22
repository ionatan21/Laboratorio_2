import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, ImageBackground } from "react-native";
import Button from "./Button";
import { db } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";

const ModificarProducto = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [codigoProducto, setCodigoProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const fetchProducto = async () => {
      const doc = await db.collection("Product").doc(id).get();
      const data = doc.data();
      setNombreProducto(data.Nombre);
      setCodigoProducto(data.codigoProducto);
      setCantidad(data.cantidad);
      setFechaCaducidad(data.fechaCaducidad);
    };

    fetchProducto();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("Product").doc(id).update({
      Nombre: nombreProducto,
      codigoProducto: codigoProducto,
      cantidad: cantidad,
      fechaCaducidad: fechaCaducidad,
    }).then(() => {
      console.log("Producto modificado correctamente");
      setMensajeExito("Producto modificado exitosamente.");
      setTimeout(() => {
        setMensajeExito("");
        navigation.navigate("Principal");
      }, 2000);
    }).catch((error) => {
      console.error("Error al modificar el producto: ", error);
    });
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        {mensajeExito ? (
          <Text style={styles.successMessage}>{mensajeExito}</Text>
        ) : (
          <>
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
          </>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left"
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
    color: "black",
    width: 300,
    backgroundColor: "white"
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
  successMessage: {
    fontSize: 18,
    color: "green",
    marginVertical: 20,
    textAlign: "center",
  },
});

export default ModificarProducto;
