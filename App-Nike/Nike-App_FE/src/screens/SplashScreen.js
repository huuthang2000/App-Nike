import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React  from "react";
import { Entypo } from "@expo/vector-icons";

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/iconSplash.png")}
        style={styles.image}
      />
      <Text style={styles.title}>HT - Store</Text>
      <Text style={styles.information}>Welcome to HT - Store</Text>
      <View style={styles.auth}>
        <Pressable style={styles.btn} onPress={()=> navigation.replace('Login')}>
          <Text style={styles.txt}>Login</Text>
          <Entypo name="login" size={24} color="black" style={styles.icon} />
        </Pressable>
        <Pressable style={styles.btn} onPress={()=> navigation.replace('Register')}>
          <Text style={styles.txt}>Register</Text>
          <Entypo name="add-user" size={24} color="black" style={styles.icon}/>
        </Pressable>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(32,53,70)",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "sans-serif", //, verdana, arial, sans-serif'
    fontStyle: "italic",
    marginTop: -15,
  },
  information: {
    color: "#f7c744",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "sans-serif", //, verdana, arial, sans-serif'
    fontStyle: "italic",
    marginTop: 5,
    opacity: 0.8,
  },
  auth: {
    marginTop: 30,
    flexDirection: "column",
  },
  btn: {
    backgroundColor: "#f7c744",
    margin: 20,
    width: 150,
    borderRadius: 10,
    height:50,
    
  },
  txt: {
    color: "black",
    fontWeight: "500",
    padding: 15,
    textAlign: "center",
    fontSize: 17,
    
  },
  icon: {
    marginBottom:10,
    marginTop:-36,
    marginLeft:10
  },
});
