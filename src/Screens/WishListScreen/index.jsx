import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  TouchableNativeFeedback,
  View,
} from "react-native";
import CustomText from "../../Components/CustomText";
import ProductItem from "../../Components/ProductItem";
import styles from "./styles";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
const WishList = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [favs, setFavs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavs = async () => {
    setFavs([]);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.data().favs) {
      for (let item of userSnap.data().favs) {
        const prodRef = doc(db, "products", item);
        const prodSnap = await getDoc(prodRef);
        if (prodSnap.exists()) {
          setFavs((prev) => [...prev, { ...prodSnap.data(), id: prodSnap.id }]);
        }
      }
    }
    setRefreshing(false);
  };
  useEffect(() => {
    fetchFavs();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginLeft: 15, marginTop: 15 }}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableNativeFeedback>
      </View>
      <CustomText font="JostMedium" style={styles.title}>
        My Wishlist
      </CustomText>
      {favs.length !== 0 ? (
        <FlatList
          data={favs}
          onRefresh={() => {
            setRefreshing(true);
            fetchFavs();
          }}
          refreshing={refreshing}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{
            backgroundColor: "#F7F8FA",
          }}
          contentContainerStyle={{
            marginHorizontal: 30,
            marginTop: 10,
            flex: 1,
          }}
        />
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <CustomText
            font={"JostRegular"}
            style={{ textAlign: "center", fontSize: 16 }}
          >
            Looks like you haven't added any products to your WishList
          </CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WishList;
