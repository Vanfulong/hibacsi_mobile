import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Onboarding, Search, CountryDetail, Login, Register } from "./screens";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
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
              name="Onboard"
              options={{ headerShown: false }}
              component={Onboarding}
            />
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
