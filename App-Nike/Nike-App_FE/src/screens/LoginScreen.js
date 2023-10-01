import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLoginUserMutation } from "../store/apiSclice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();

  // useEffect(()=>{
  //   const checkLoginStatus = async ()=>{
  //     try {
  //       const token = await AsyncStorage.getItem("AccessToken");
  //       if(token){
  //         navigation.replace("Products");
  //       }
  //     } catch (error) {
  //       console.log("error",error)
  //     }
  //   }
  //   checkLoginStatus()
  // },[]);

  const login = async () => {
    const result = await loginUser({
      email,
      password,
    });
   
    if(result){
      // console.log("object " + result.data?.data.token)
      const token = result.data?.data.token;
      // console.log(" 12121212",result.data?.data)
      // console.log("Token check")
      // AsyncStorage.setItem("AccessToken",token)
      navigation.replace('Products')
    }else{
      Alert.alert('Register User Error!')
    }
    
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/iconSplash.png")}
          style={styles.image}
        />
        <Text style={styles.title}>HT - Store</Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.titleForm}>Login</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="rgba(255,255,255,0.8)"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          returnKeyType="next"
          autoCorrect={false}
          style={styles.input}
        />
        <View style={styles.password}>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="go"
            secureTextEntry={hidePass ? true : false}
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <Ionicons
            name="eye-off-outline"
            size={24}
            color="black"
            style={styles.icon}
            onPress={() => setHidePass(!hidePass)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.txtLogin} >
            Login {isLoading && <ActivityIndicator />}
          </Text>
        </TouchableOpacity>
        <View style={styles.register}>
          <Text style={styles.txtRegister}>New to HT - Store? </Text>
          <Text
            style={styles.txtBold}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(32,53,70)",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 170,
  },
  image: {
    width: 100,
    height: 100,
  },
  information: {
    flex: 2,
    left: 0,
    right: 0,
    height: 300,
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "left",
    fontWeight: "600",
    fontFamily: "sans-serif", //, verdana, arial, sans-serif'
    fontStyle: "italic",
  },
  titleForm: {
    color: "white",
    fontSize: 23,
    textAlign: "left",
    fontWeight: "600",
    fontFamily: "sans-serif", //, verdana, arial, sans-serif'
    fontStyle: "italic",
    color: "#f7c744",
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingLeft: 20,
    marginTop: 20,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 25,
  },
  btn: {
    backgroundColor: "#f7c744",
    marginVertical: 40,
    justifyContent: "center",
    marginLeft: 40,
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
  },
  txtLogin: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  register: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtRegister: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
  },
  txtBold: {
    fontSize: 20,
    color: "#f7c744",
    fontWeight: "500",
  },
});
