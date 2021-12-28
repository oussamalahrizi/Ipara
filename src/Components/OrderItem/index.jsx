import React from "react";
import { View, Image } from "react-native";
import CustomText from "../CustomText";
import styles from "./styles";
const OrderItem = ({ product }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{ uri: product.image }}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, paddingRight: 13, paddingTop: 5 }}>
        <CustomText font={"JostRegular"}>{product.name}</CustomText>
        <CustomText font={"JostBold"}>{product.price} DH</CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={{ fontSize: 20 }} font={"JostRegular"}>
            x {product.itemQuantity}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;
