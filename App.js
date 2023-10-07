import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Onboarding, Search, CountryDetail } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

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
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
