import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import MainPage from "./src/pages/MainPage";
import SearchPage from "./src/pages/SearchPage";
import CartPage from "./src/pages/CartPage";
import ProductDetailPage from "./src/pages/ProductDetailPage";
import AccountPage from "./src/pages/AccountPage";

const Stack = createNativeStackNavigator();

function App() {
  const theme = extendTheme({
    fontConfig: {
      Roboto: {
        100: {
          normal: "Roboto-Light",
          italic: "Roboto-LightItalic",
        },
        200: {
          normal: "Roboto-Light",
          italic: "Roboto-LightItalic",
        },
        300: {
          normal: "Roboto-Light",
          italic: "Roboto-LightItalic",
        },
        400: {
          normal: "Roboto-Regular",
          italic: "Roboto-Italic",
        },
        500: {
          normal: "Roboto-Medium",
        },
        600: {
          normal: "Roboto-Medium",
          italic: "Roboto-MediumItalic",
        },
        700: {
          normal: "Roboto-Bold",
        },
        800: {
          normal: "Roboto-Bold",
          italic: "Roboto-BoldItalic",
        },
        900: {
          normal: "Roboto-Bold",
          italic: "Roboto-BoldItalic",
        },
      },
    },

    fonts: {
      heading: "Roboto",
      body: "Roboto",
      mono: "Roboto",
    },
    colors: {
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      amber: {
        400: "#d97706",
      },
    },
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailPage}
            options={({ route }) => ({
              title: route.params.brandName,
            })}
          />
          <Stack.Screen
            name="Account"
            component={AccountPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
