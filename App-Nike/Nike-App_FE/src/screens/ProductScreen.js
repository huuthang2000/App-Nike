import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { productSlice } from "../store/productSlice";
import { useGetProductsQuery } from "../store/apiSclice";
import { selectUser } from "../store/userSlice";

const ProductScreen = () => {
  const navigation = useNavigation();

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  // const products = useSelector((state) => state.products.products);

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error fetching products {error.error}</Text>;
  }

  const products = data.data;
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              // update selected product
              // dispatch(productSlice.actions.setSelectedProduct(item.id))
              navigation.navigate("Product Details", { id: item._id });
            }}
            style={styles.itemContainer}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
            />
          </Pressable>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
