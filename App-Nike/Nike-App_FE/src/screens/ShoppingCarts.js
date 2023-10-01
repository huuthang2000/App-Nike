import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSlice,
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSclice";
import { selectUser } from "../store/userSlice";
import { useNavigation } from "@react-navigation/native";

const ShoppingCartTotals = () => {
  const navigation = useNavigation();
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();
  const cartItems = useSelector((state) => state.cart.items);

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: user.data?.name,
        address: user.data?.address,
        email: "teo@gmail.com",
      },
    });
    // console.log("123456789" + result.data?.message);
    if (result.data?.message === "Insert order successfully") {
      Alert.alert(
        "Order has been submitted",
        `Your order reference is: ${result.data?.data._id}`,
        [
          {
            text: 'Ok',
            onPress: () => navigation.replace("Products"),
          },
        ],
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <View style={styles.totalsContainer}>
      <View>
        <Text style={styles.contact}>Customer contact information </Text>
        <View style={styles.row}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>{user.data?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Phone</Text>
          <Text style={styles.text}>{user.data?.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Address</Text>
          <Text style={styles.text}>{user.data?.address}</Text>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            marginVertical: 8,
          }}
        />
      </View>
      <View>
        <Text style={styles.contact}>Order cost details </Text>
        <View style={styles.row}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{subtotal}US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Delivery</Text>
          <Text style={styles.text}>{deliveryFee} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Total</Text>
          <Text style={styles.textBold}>{total} US$</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onCreateOrder}>
        <Text style={styles.buttonText}>
          Checkout
          {isLoading && <ActivityIndicator />}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ShoppingCarts = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();

  const user = useSelector(selectUser);

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
    </>
  );
};

export default ShoppingCarts;

const styles = StyleSheet.create({
  totalsContainer: {
    padding: 20,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#f7c744",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
  contact: {
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
