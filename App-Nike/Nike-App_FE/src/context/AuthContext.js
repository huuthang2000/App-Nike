import React, { createContext } from "react";
import { useCreateUserMutation } from "../store/apiSclice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [createUser, { data, isLoading, error }] = useCreateUserMutation();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error fetching products {error.error}</Text>;
  }
  const register = ({ email, password, name, phoneNumber, address }) => {
    createUser({
      email,
      password,
      name,
      phoneNumber,
      address,
    });
    console.log(data.data)
  };
  return (
    <AuthContext.Provider value={{register}}>{children}</AuthContext.Provider>
  );
};
