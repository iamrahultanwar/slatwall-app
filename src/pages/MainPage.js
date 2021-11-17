import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeView from "../views/HomeView";

const Tab = createBottomTabNavigator();

export default function MainPage() {
  const icons = {
    home: ["home", "home-outline"],
    settings: ["cog", "cog-outline"],
    search: ["search-web", "search-web"],
    cart: ["cart", "cart-outline"],
  };

  const CustomFooter = (props) => <Footer {...props} icons={icons} />;

  return (
    <>
      <Header />
      {/* <Tab.Navigator tabBar={CustomFooter}>
        <Tab.Screen
          name="Home"
          component={HomeView}
          options={{ headerShown: false }}
        />
      </Tab.Navigator> */}
      <HomeView />
    </>
  );
}
