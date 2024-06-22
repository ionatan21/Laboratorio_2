import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Aprender = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [viewFavorites, setViewFavorites] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('https://www.fruityvice.com/api/fruit/all');
      const data = await response.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const filteredProductos = productos.filter(producto =>
    producto.name.toLowerCase().includes(search.toLowerCase())
  );

  const favoriteProducts = productos.filter(producto =>
    favorites.includes(producto.name) &&
    producto.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (item) => {
    if (favorites.includes(item.name)) {
      setFavorites(favorites.filter(fav => fav !== item.name));
    } else {
      setFavorites([...favorites, item.name]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText1}>Familia: {item.family}</Text>
      <Text style={styles.itemText1}>Nutrición: {JSON.stringify(item.nutritions)}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Text style={styles.favoriteButton}>
          {favorites.includes(item.name) ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/fondo.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setViewFavorites(!viewFavorites)}>
          <Text style={styles.toggleButton}>
            {viewFavorites ? 'Ver Todos los Productos' : 'Ver Favoritos'}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={viewFavorites ? favoriteProducts : filteredProductos}
          renderItem={renderItem}
          keyExtractor={item => item.name}
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
  searchInput: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color: "black",
    backgroundColor: "white"
  },
  item: {
    backgroundColor: '#871F1F',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: "white"
  },
  itemText1: {
    fontSize: 14,
    color: "white"
  },
  favoriteButton: {
    color: "#3cff00",
    marginTop: 10,
  },
  toggleButton: {
    color: '#00bfff',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
  },
});

export default Aprender;