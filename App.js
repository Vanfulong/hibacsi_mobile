import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  Onboarding,
  Search,
  CountryDetail,
  Login,
  Register,
  DoctorDetail,
  ProfileDetail,
  Appointment,
  AppointmentHistory,
  Setting,
  ChangePassword,
  PrivacyPolicy,
  Bmi,
  HospitalDetail,
  Blog,
  CategoryDetail,
  Chatting,
} from "./screens";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import * as SecureStore from "expo-secure-store";
import axiosClients from "./helper/axiosClients";
import axiosClientForm from "./helper/axiosFormData";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState(null);
  const [loaded, error] = useFonts({
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    light: require("./assets/fonts/Inter-Light.ttf"),
    xtrabold: require("./assets/fonts/Inter-ExtraBold.ttf"),
  });
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("TOKEN_KEY");
      const refresh_token = await SecureStore.getItemAsync("REFRESH_TOKEN_KEY");

      if (token) {
        axiosClients.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        axiosClientForm.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }
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
        setAuthState({
          token: token,
          refresh_token: refresh_token,
          authenticated: authenticated,
          user: {
            ...result,
            first_name: name
          },
        });
        setLoading(true);
      } catch (error) {
        console.log(error)
        setAuthState((prev)=>({
          ...prev, 
          authenticated: false
        }))
        setLoading(true);
      }
    };
    loadToken();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);
  if (error) {
    throw new Error("Fonts not loaded");
  }
  if (!loading) {
    return null;
  }

  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <Layout authStates={authState} />
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export const Layout = ({ authStates }) => {
  const {authState, setAuthState, setCurrentUser } = useAuth();
  const [tempAuth, setTempAuth] = useState(authStates)
  useEffect(() => {
    setAuthState({
      token: authStates.token,
      refresh_token: authStates.refresh_token,
      authenticated: authStates.authenticated,
    });
    setCurrentUser(authStates.user)

  }, []);
  useEffect(()=>{
    setTempAuth((prev)=>({...prev, authenticated : authState.authenticated}))
  },[authState])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {tempAuth.authenticated ? (
          <>
            <Stack.Screen
              name="Bottom"
              options={{ headerShown: false }}
              component={BottomTabNavigation}
            />
            <Stack.Screen
              name="Search"
              options={{ headerShown: false }}
              component={Search}
            />
            <Stack.Screen
              name="CountryDetail"
              options={{ headerShown: false }}
              component={CountryDetail}
            />
            <Stack.Screen
              name="DoctorDetail"
              options={{ headerShown: false }}
              component={DoctorDetail}
            />
            <Stack.Screen
              name="ProfileDetail"
              options={{ headerShown: false }}
              component={ProfileDetail}
            />
            <Stack.Screen
              name="Appointment"
              options={{ headerShown: false }}
              component={Appointment}
            />

            <Stack.Screen
              name="AppointmentHistory"
              options={{ headerShown: false }}
              component={AppointmentHistory}
            />
            <Stack.Screen
              name="Setting"
              options={{ headerShown: false }}
              component={Setting}
            />
            <Stack.Screen
              name="ChangePassword"
              options={{ headerShown: false }}
              component={ChangePassword}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              options={{ headerShown: false }}
              component={PrivacyPolicy}
            />
            <Stack.Screen
              name="Bmi"
              options={{ headerShown: false }}
              component={Bmi}
            />
            <Stack.Screen
              name="HospitalDetail"
              options={{ headerShown: false }}
              component={HospitalDetail}
            />
            <Stack.Screen
              name="Blog"
              options={{ headerShown: false }}
              component={Blog}
            />
            <Stack.Screen
              name="CategoryDetail"
              options={{ headerShown: false }}
              component={CategoryDetail}
            />
            <Stack.Screen
              name="Chatting"
              options={{ headerShown: false }}
              component={Chatting}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
              component={Register}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
