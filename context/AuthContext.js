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
    token: null,
    refresh_token: null,
    authenticated: false,
  });

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("TOKEN_KEY");
      const refresh_token = await SecureStore.getItemAsync("REFRESH_TOKEN_KEY");
      console.log("AuthContext Token: ", token);
      console.log("AuthContext refresh Token: ", refresh_token);
      if (token) {
        axiosClients.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        setAuthState({
          token: token,
          refresh_token: refresh_token,
          authenticated: true,
        });
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

  const login = async (username, password) => {
    try {
      console.log("Login AuthContext start");
      const result = await axiosClients.post("/auth/login/", {
        username,
        password,
      });
      console.log("AuthContext login result:  ", result);
      setAuthState({
        token: result.token,
        refresh_token: result.refresh_token,
        authenticated: true,
      });
      const name = result.user.name.split(' ').pop();
      setCurrentUser({...result.user,first_name: name})
      axiosClients.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.access_token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.access_token);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, result.refresh_token);

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
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axiosClients.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
