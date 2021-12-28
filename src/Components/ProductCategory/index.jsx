import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../ProductItem";
import CustomText from "../CustomText";
import styles from "./styles";
const ProductCategory = ({ title, products }) => {
  return (
    <View style={styles.container}>
      <CustomText font="JostMedium" style={styles.title}>
        {title}
      </CustomText>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductCategory;
