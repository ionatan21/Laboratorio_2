import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert 
} from "react-native";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ListarProducto = () => {
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProductos = async () => {
      const snapshot = await db.collection("Product").get();
      setProductos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchProductos();
  }, []);

  const eliminarProducto = (id) => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            await db.collection('Product').doc(id).delete();
            setProductos(productos.filter(producto => producto.id !== id));
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.options}>
        <Text style={styles.itemText}>{item.Nombre} </Text>
        <Text style={styles.itemText2}>Cantidad {item.cantidad}</Text>
      </View>
      <View style={styles.options}>
        <Text style={styles.itemText2}>Codigo: {item.codigoProducto} </Text>
        <Text style={styles.itemText2}>Caducidad: {item.fechaCaducidad} </Text>
      </View>

      <View style={styles.options1}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ModificarProducto", { id: item.id })
          }
        >
          <Text style={styles.modifyButton}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
  },
  item: {
    backgroundColor: "#871F1F",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  options: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  options1: {
    marginTop: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    color: "white",
  },
  itemText2: {
    fontSize: 14,
    color: "white",
  },
  modifyButton: {
    color: "white",
  },
  deleteButton: {
    color: "white",
  },
});

export default ListarProducto;
