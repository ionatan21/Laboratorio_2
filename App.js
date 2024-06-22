import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/login";
import Producto from "./components/producto";
import Registro from "./components/registro";
import Principal from "./components/Principal";
import ListarProducto from "./components/ListarProducto";
import Aprender from "./components/Aprender";
import ModificarProducto from "./components/ModificarProducto";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Producto" component={Producto} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="ListarProducto" component={ListarProducto} />
        <Stack.Screen name="Aprender" component={Aprender} />
        <Stack.Screen name="ModificarProducto" component={ModificarProducto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}