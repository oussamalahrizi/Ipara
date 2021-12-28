import { useNavigation } from "@react-navigation/core";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { db } from "../../../config";
import Customtext from "../../Components/CustomText";
import styles from "./styles";

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  const [category, setCategory] = useState("");

  const getCatgory = async () => {
    const docRef = doc(db, "categories", product.category);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCategory(docSnap.data().name);
    }
  };
  const onPress = () => {
    navigation.navigate("ProductScreen", { product });
  };
  useEffect(() => {
    getCatgory();
  }, []);
  const name =
    product.name.length > 10
      ? product.name.split("").splice(0, 10).join("") + "..."
      : product.name;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: product.image }}
          resizeMethod="resize"
          style={styles.image}
        />
        <Customtext numberOfLines={2} font="JostMedium" style={styles.name}>
          {name}
        </Customtext>

        <Customtext
          font="JostRegular"
          style={[styles.name, { color: "#898989" }]}
        >
          {category}
        </Customtext>
        <Customtext font="JostBold" style={styles.price}>
          {product.price}.00 DH
        </Customtext>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
