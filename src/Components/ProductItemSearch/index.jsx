import { useNavigation } from "@react-navigation/core";
import React from "react";

import { View, Image } from "react-native";
import Customtext from "../../Components/CustomText";
import styles from "./styles";

const ProductItemSearch = ({ product }) => {
  const name =
    product.name.length > 10
      ? product.name.split("").splice(0, 10).join("") + "..."
      : product.name;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        resizeMethod="resize"
        style={styles.image}
      />
      <Customtext numberOfLines={2} font="JostRegular" style={styles.name}>
        {name}
      </Customtext>
      <Customtext font="JostMedium" style={styles.price}>
        {product.price}.00 DH
      </Customtext>
    </View>
  );
};

export default ProductItemSearch;
