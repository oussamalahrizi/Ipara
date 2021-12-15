import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/AuthScreens/Login";
import Register from "../../Screens/AuthScreens/Register";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
