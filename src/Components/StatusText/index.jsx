import React, { useState } from "react";
import { Pressable } from "react-native";
import CustomText from "../CustomText";
const StatusText = (props) => {
  const { style, item, selected } = props;

  return (
    <CustomText
      font="JostRegular"
      style={[
        style,
        { color: selected === item.id ? "white" : "black" },
        selected === item.id && {
          backgroundColor: "#059c54",
          borderRadius: 16,
        },
      ]}
      font="JostRegular"
    >
      {item.text}
    </CustomText>
  );
};

export default StatusText;
