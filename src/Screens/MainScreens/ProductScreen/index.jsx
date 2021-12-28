import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
} from "react-native";
import styles from "./styles";
import ProductCategory from "../../../Components/ProductCategory";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../config";
import { getAuth } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../../Components/CustomText";
import { addToCart } from "../../../redux/CartSlice";
import { useDispatch } from "react-redux";
import ProductItem from "../../../Components/ProductItem";

const ProductScreen = () => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [heart, setHeart] = useState(null);
  const auth = getAuth();
  const route = useRoute();
  const { product } = route.params;

  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const handleBack = () => {
    navigation.goBack();
  };

  const handleFav = async () => {
    if (auth.currentUser) {
      try {
        const docref = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docref);
        if (docSnap.data().favs) {
          const favs = docSnap.data().favs;
          if (heart) {
            const newFavs = favs.filter((item) => item !== product.id);
            setDoc(docref, {
              ...docSnap.data(),
              favs: newFavs,
            });

            setHeart(false);
            ToastAndroid.show(
              product.name + " has been removed from your wishlist",
              ToastAndroid.SHORT
            );
          } else {
            favs.push(product.id);
            setHeart(true);
            ToastAndroid.show(
              product.name + " has been added to your wishlist",
              ToastAndroid.SHORT
            );
            const payload = {
              ...docSnap.data(),
              favs,
            };
            await setDoc(docref, payload);
          }
        } else {
          const payload = {
            ...docSnap.data(),
            favs: [product.id],
          };
          await setDoc(docref, payload);
          setHeart(true);
          ToastAndroid.show(
            product.name + " has been added to your wishlist",
            ToastAndroid.SHORT
          );
        }
      } catch (error) {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Must be logged in", ToastAndroid.SHORT);
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
      where("category", "==", product.category)
    );
    const res = await getDocs(q);
    setSimilarProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const fetchFav = async () => {
    if (auth.currentUser) {
      const docref = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docref);
      if (docSnap.data().favs) {
        const index = docSnap
          .data()
          .favs.findIndex((item) => item === product.id);
        if (index !== -1) setHeart(true);
      }
    }
  };
  useEffect(() => {
    FetchsimilarProducts();
    fetchFav();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeader}></View>
      </View>

      <ScrollView style={styles.container}>
        <Image style={styles.bgImage} source={{ uri: product.image }} />
        <View style={styles.nameContainer}>
          <CustomText font="JostRegular" style={styles.name}>
            {product.name}
          </CustomText>
          <View>
            {product.sale && (
              <CustomText font="JostRegular" style={styles.sale}>
                Sale {product.sale} %
              </CustomText>
            )}
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
        <View style={{ marginBottom: 30 }}>
          <ProductCategory
            title="Similar Products"
            products={similarProducts}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleFav(heart)}>
          <AntDesign
            name={heart ? "heart" : "hearto"}
            size={26}
            color={heart ? "red" : "black"}
          />
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
    </SafeAreaView>
  );
};

export default ProductScreen;
