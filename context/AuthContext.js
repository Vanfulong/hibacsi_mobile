import { useState } from "react";
import { createContext, useContext } from "react";
import axiosClients from "../helper/axiosClients";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    toke: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async() => {
        const token = await SecureStore.getItemAsync('TOKEN_KEY');
        console.log('AuthContext Token: ', token);
        if(token){
            axiosClients.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAuthState({
                token:token,
                authenticated:true
            })
        }

    };
    loadToken();
  }, []);
  const register = async (email, password) => {
    try {
      return await axiosClients.post("/register", { email, password });
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await axiosClients.post("/login", { email, password });
      console.log("AuthContext login result:  ", result);
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });
      axiosClients.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return resultl;
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axiosClients.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    setAuthState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
