import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import Customtext from "../../Components/CustomText";
import styles from "./styles";

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("ProductScreen", { product });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: product.image }}
          resizeMethod="resize"
          style={styles.image}
        />
        <Customtext numberOfLines={2} font="JostRegular" style={styles.name}>
          {product.name}
        </Customtext>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Customtext font="JostBold" style={styles.price}>
            {product.price}DH
          </Customtext>
          <Customtext font="JostRegular" style={styles.initialPrice}>
            {product.initialPrice}DH
          </Customtext>
        </View>

        <Customtext font="JostRegular" style={styles.quantity}>
          {product.quantity}
        </Customtext>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
