import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import styles from "./styles";
import ProductCategory from "../../../Components/ProductCategory";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../../Components/CustomText";
import { addToCart } from "../../../redux/CartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [heart, setHeart] = useState(null);
  const route = useRoute();
  const { product } = route.params;
  const favs = [];
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const handleBack = () => {
    navigation.goBack();
  };
  const handleMenu = () => {};
  const handleFav = (status) => {
    if (status) {
      favs.splice(favs.indexOf(product.id));
      setHeart(false);
    } else {
      favs.push(product.id);
      setHeart(true);
    }
  };
  const dispatch = useDispatch();
  const handleAddtocart = () => {
    dispatch(addToCart({ ...product, itemQuantity: quantity }));
    ToastAndroid.show(
      product.name + " has been added to your cart",
      ToastAndroid.SHORT
    );
  };
  const FetchsimilarProducts = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "products"),
      where("category", "==", "COMPLÉMENTS ALIMENTAIRES")
    );
    const res = await getDocs(q);
    setSimilarProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    favs.map((item) => {
      if (product.id == item) setHeart(true);
    });
    FetchsimilarProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => handleFav(heart)}>
            <AntDesign
              name={heart ? "heart" : "hearto"}
              size={26}
              color={heart ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <Image style={styles.bgImage} source={{ uri: product.image }} />
        <View style={styles.nameContainer}>
          <CustomText font="JostRegular" style={styles.name}>
            {product.name}
          </CustomText>
          <View>
            <CustomText font="JostRegular" style={styles.sale}>
              Sale {product.sale} %
            </CustomText>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <CustomText font="JostBold" style={styles.price}>
            dhs{product.price}
          </CustomText>
          <CustomText font="JostRegular" style={styles.initialPrice}>
            dhs{product.initialPrice}
          </CustomText>
        </View>
        <View style={styles.quantityContainer}>
          <CustomText font="JostRegular" style={styles.availability}>
            Availability :
          </CustomText>
          <CustomText
            font="JostRegular"
            style={[
              styles.quantity,
              product.quantity > 0 ? { color: "green" } : { color: "red" },
            ]}
          >
            {" "}
            {product.quantity > 0 ? "In Stock" : "Sold Out"}{" "}
          </CustomText>
        </View>
        <View style={styles.shortDescontainer}>
          <CustomText style={{ fontSize: 16 }} font="JostRegular">
            {" "}
            {product.shortDescription}{" "}
          </CustomText>
        </View>
        <View style={styles.select}>
          <CustomText font="JostRegular" style={styles.selectQ}>
            Select the quantity :
          </CustomText>
          <View style={styles.quantityInputContainer}>
            <TouchableOpacity
              style={styles.icons}
              onPress={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            >
              <AntDesign name="minus" size={25} color="black" />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.icons}
              onPress={() => {
                if (quantity < product.quantity) setQuantity(quantity + 1);
              }}
            >
              <AntDesign name="plus" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buyNowContainer}>
            <CustomText font="JostRegular" style={styles.buyNow}>
              Buy Now
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddtocart}
            style={styles.addToCartContainer}
          >
            <CustomText font="JostRegular" style={styles.addToCart}>
              Add To Cart
            </CustomText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setShow(!show)}
          style={styles.descontainer}
        >
          <CustomText font="JostMedium" style={styles.descriptionTitle}>
            Description
          </CustomText>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        {show && (
          <CustomText style={styles.description} font="JostRegular">
            {" "}
            {product.description}{" "}
          </CustomText>
        )}
        <View style={{ marginVertical: 10 }}>
          <ProductCategory
            title="Similar Products"
            products={similarProducts}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <ProductCategory
            title="You might also like"
            products={similarProducts}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;
