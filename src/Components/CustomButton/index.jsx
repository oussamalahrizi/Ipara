import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "../CustomText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const CustomButton = (props) => {
  const { icon, text, onpress } = props;
  return (
    <TouchableOpacity onPress={onpress} style={styles.container}>
      <View style={styles.innerContainer}>
        <AntDesign
          name={icon}
          color="black"
          size={25}
          style={{ marginRight: 20 }}
        />
        <CustomText
          style={{ fontSize: 17, textAlign: "left" }}
          font="JostMedium"
        >
          {text}
        </CustomText>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default CustomButton;
