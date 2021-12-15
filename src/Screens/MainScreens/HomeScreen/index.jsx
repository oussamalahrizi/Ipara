import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import iparaLogo from "../../../../assets/icons/ipara_logo.png";
import { db } from "../../../../config";
import ProductCategory from "../../../Components/ProductCategory";
import { collection, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import IconBadge from "react-native-icon-badge";
import CustomText from "../../../Components/CustomText";
const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart);
  const navigation = useNavigation();

  useEffect(async () => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setCategories(products.map((item) => item.category));
      setLoading(false);
    });

    return unsub;
  }, [loading]);

  // get products of a specific category
  const handleProductsCat = (category) => {
    return products.map((item) => {
      if (item.category === category) return item;
    });
  };
  // cart pressed
  const handleCart = () => {
    navigation.navigate("CartScreen");
  };
  //search pressed
  const handleSearch = () => {
    navigation.navigate("MainStack", { screen: "Search" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSearch}>
          <AntDesign
            name="search1"
            size={28}
            color="black"
            style={{ padding: 8 }}
          />
        </TouchableOpacity>
        <Image source={iparaLogo} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={handleCart}>
          <IconBadge
            MainElement={
              <AntDesign
                name="shoppingcart"
                size={26}
                color="black"
                style={{ padding: 8 }}
              />
            }
            BadgeElement={
              <CustomText
                font="JostMedium"
                style={{ color: "white", fontSize: 13 }}
              >
                {cart.totalQuantity}
              </CustomText>
            }
            IconBadgeStyle={styles.IconBadge}
            Hidden={cart.totalQuantity === 0}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.container}
          color="black"
          size="large"
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <ProductCategory
              key={item}
              title={item}
              products={handleProductsCat(item)}
            />
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};

export default HomeScreen;
