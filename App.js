import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Onboarding, Search, CountryDetail, Login, Register, DoctorDetail, ProfileDetail, Appointment, AppointmentHistory } from "./screens";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    light: require("./assets/fonts/Inter-Light.ttf"),
    xtrabold: require("./assets/fonts/Inter-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (error) {
    throw new Error("Fonts not loaded");
  }
  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <Layout />
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}
export const Layout = () => {
  const { authState } = useAuth();
  console.log(authState);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState.authenticated ? (
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
              options={{ headerShown: false}}
              component={DoctorDetail}
            />
            <Stack.Screen
            name="ProfileDetail"
            options={{ headerShown: false}}
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
