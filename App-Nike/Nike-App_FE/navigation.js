import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ShoppingCarts from "./src/screens/ShoppingCarts";
import { Pressable, Text } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectedNumberOfItems } from "./src/store/cartSlice";
import TrackOrder from "./src/screens/TrackOrder";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItem = useSelector(selectedNumberOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{ flexDirection: "row" }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: "500" }}>
                  {numberOfItem}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                onPress={() => navigation.navigate("Track Order")}
                name="truck-delivery"
                size={28}
                color="gray"
                marginRight={15}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Cart" component={ShoppingCarts} />
        <Stack.Screen name="Track Order" component={TrackOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
