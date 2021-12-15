import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import HomeScreen from "../../Screens/MainScreens/HomeScreen";
import CategoriesScreen from "../../Screens/MainScreens/CategoriesScreen";
import SearchScreen from "../../Screens/MainScreens/SearchScreen";
import AccountScreen from "../../Screens/MainScreens/AccountScreen";

const MainStack = () => {
  const Stack = AnimatedTabBarNavigator();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeBackgroundColor: "#CFE8E5",
        keyboardHidesTabBar: true,
        tabStyle: {
          borderTopWidth: 1,
          borderColor: "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}
      screenOptions={{
        tabBarActiveTintColor: "#139E97",
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
