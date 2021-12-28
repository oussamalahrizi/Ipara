import React from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Text } from "react-native";

const CustomText = ({ children, font, style }, props) => {
  const [loaded] = useFonts({
    JostRegular: require("../../../assets/fonts/Jost-Regular.ttf"),
    JostBold: require("../../../assets/fonts/Jost-Bold.ttf"),
    JostMedium: require("../../../assets/fonts/Jost-Medium.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <Text {...props} style={[style, { fontFamily: font }]}>
      {children}
    </Text>
  );
};

export default CustomText;
