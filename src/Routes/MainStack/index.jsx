import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import HomeScreen from "../../Screens/MainScreens/HomeScreen";
import CartSreen from "../../Screens/CartSreen";
import SearchScreen from "../../Screens/MainScreens/SearchScreen";
import AccountScreen from "../../Screens/MainScreens/AccountScreen";
import IconBadge from "react-native-icon-badge";
import styles from "../../Screens/MainScreens/HomeScreen/styles";
import CustomText from "../../Components/CustomText";
import { useSelector } from "react-redux";
import { Icon, withBadge } from "react-native-elements";
import { View } from "react-native";

const MainStack = () => {
  const Stack = AnimatedTabBarNavigator();
  const cart = useSelector((state) => state.cart);
  const BadgedIcon = withBadge(cart.totalQuantity, {
    right: -5,
    hidden: cart.totalQuantity === 0,
  })(Icon);
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartSreen}
        options={{
          tabBarIcon: () => (
            <View style={{ paddingRight: 5 }}>
              <BadgedIcon type="ionicon" name="cart-outline" />
            </View>
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
