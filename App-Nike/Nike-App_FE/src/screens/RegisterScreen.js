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
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useCreateUserMutation } from "../store/apiSclice";

const RegisterScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const [createUser, { data, isLoading, error }] = useCreateUserMutation();

  const createRegister = async()=>{
    const result = await createUser({
      email,
      password,
      name,
      phoneNumber: phone,
      address
    });
    if(result){
      navigation.navigate('Login')
    }else{
      Alert.alert('Register User Error!')
    }
    console.log("121313"+result.data.data)
  }
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
        <Text style={styles.titleForm}>Register</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="rgba(255,255,255,0.8)"
          keyboardType="email-address"
          returnKeyType="next"
          value={email}
          onChangeText={text => setEmail(text)}
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
            onChangeText={text=>setPassword(text)}
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
        <TextInput
          placeholder="Enter name"
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType="next"
          value={name}
          onChangeText={text=>setName(text)}
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Phone"
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType="next"
          value={phone}
          onChangeText={text=>setPhone(text)}
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter address"
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType="next"
          autoCorrect={false}
          value={address}
          onChangeText={text =>setAddress(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.txtRegister} onPress={createRegister}>Register</Text>
        </TouchableOpacity>
        <View style={styles.login}>
          <Text style={styles.txtLogin}>Do you already have an account? </Text>
          <Text
            style={styles.txtBold}
            onPress={() => navigation.navigate("Login")}
          >
            Login
            {isLoading && <ActivityIndicator/>}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
    top: -40,
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
    marginHorizontal: 5,
  },
  icon: {
    position: "absolute",
    right: 15,
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
  txtRegister: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  login: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtLogin: {
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
