import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Routes from "./src/Routes";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <StatusBar translucent />
    </Provider>
  );
}
