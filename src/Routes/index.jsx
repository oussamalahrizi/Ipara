import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import CartScreen from "../Screens/CartSreen";
import ProductScreen from "../Screens/MainScreens/ProductScreen";
import { useDispatch } from "react-redux";
import { addToCart, importLocal } from "../redux/CartSlice";
import Checkout from "../Screens/CheckoutScreen";

const Routes = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  useEffect(async () => {
    const value = await AsyncStorage.getItem("cart");
    if (value !== null) {
      dispatch(importLocal(JSON.parse(value)));
    }
  }, []);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainStack" component={MainStack} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
          name="ProductScreen"
          component={ProductScreen}
        />
        <Stack.Screen
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
          name="CartScreen"
          component={CartScreen}
        />
        <Stack.Screen name="CheckoutScreen" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
