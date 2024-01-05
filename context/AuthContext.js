import { useState } from "react";
import { createContext, useContext } from "react";
import axiosClients from "../helper/axiosClients";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Alert } from "react-native";
import axiosClientForm from "../helper/axiosFormData";
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    refresh_token: null,
    authenticated: false,
  });

  const [currentUser, setCurrentUser] = useState({})

  
  const register = async (email, password) => {
    try {
      return await axiosClients.post("/register", { email, password });
    } catch (error) {
      Alert.alert("","Đăng kí tài khoản thất bại. Vui lòng thử lại")
      return { error: true, msg: error.response.data.msg };
    }
  };

  const login = async (username, password) => {
    try {
      console.log("Login AuthContext start");
      const result = await axiosClients.post("/auth/login/", {
        username,
        password,
      });
      console.log("AuthContext login result:  ", result);
      setAuthState({
        token: result.access_token,
        refresh_token: result.refresh_token,
        authenticated: true,
      });
      const name = result.user.name.split(' ').pop();
      setCurrentUser({...result.user,first_name: name})
      axiosClients.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.access_token}`;
      axiosClientForm.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.access_token}`;
      await SecureStore.setItemAsync("TOKEN_KEY", result.access_token);
      await SecureStore.setItemAsync("REFRESH_TOKEN_KEY", result.refresh_token);

      return result;
    } catch (error) {
      if (error.response) {
        // The client was given an error response (5xx, 4xx)
        console.log(error.response.data);
        console.log(error.response.status);
        return { error: true, msg: error.response.data.detail };
      }
     
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("TOKEN_KEY");
    await SecureStore.deleteItemAsync("REFRESH_TOKEN_KEY");
    axiosClients.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, refresh_token:null,authenticated: false });
  };
  const userData = async () => {
    try {
      const result = await axiosClients.post("/token/verify/");
      let authenticated = true;
      if (result.detail == "Your token is invalid, login") {
        authenticated = false;
      }
      let name = 'bạn';
      if(result.name){
        name = result.name.split(' ').pop();
      }
      setCurrentUser({...result, first_name: name})
    } catch (error) {
      console.log('loi')
    }
    
  }
  
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    currentUser,
    setAuthState,
    setCurrentUser,
    userData
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
