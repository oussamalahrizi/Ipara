import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import {
  getFirestore,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import CustomText from "../../Components/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { db } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ClearCart } from "../../redux/CartSlice";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const dispatch = useDispatch();

  const getUserInfo = async (uid) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querysnapshot = await getDocs(q);
    const res = querysnapshot.docs.map((doc) => doc.data())[0];
    if (!res.mobile || !res.address || !res.displayName) {
      Alert.alert(
        "Missing information",
        "Please complete your profile with the necessary information to finish your order",
        [
          {
            text: "Cancel",
            onPress: () => navigation.goBack(),
          },
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("MainStack", { screen: "Account" }),
          },
        ]
      );
    } else {
      try {
        cart.map(
          async (item) =>
            await addDoc(collection(db, "orders"), {
              userUid: uid,
              productId: item.id,
              quantity: item.itemQuantity,
              totalPrice: item.price * item.itemQuantity,
            })
        );
        dispatch(ClearCart());
        setLoading(false);
      } catch (error) {
        Alert.alert("", "Something went wrong");
        console.log(error.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? getUserInfo(user.uid) : navigation.navigate("AuthStack");
    });
  }, []);
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomText font="JostRegular" style={{ fontSize: 16 }}>
          We are processing your order ....
        </CustomText>
        <ActivityIndicator
          style={{ marginTop: 10 }}
          size="large"
          color="green"
        />
      </View>
    );
  return (
    <View style={styles.container}>
      <CustomText font="JostBold" style={styles.Title}>
        Thank you!
      </CustomText>
      <CustomText font="JostRegular" style={styles.message}>
        Your order has been placed! We will contact you soon.{"\n"}
        You can Continue Shopping.
      </CustomText>
      <TouchableOpacity
        onPress={() => navigation.navigate("MainStack")}
        style={styles.shoppingButton}
      >
        <AntDesign
          name="shoppingcart"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <CustomText font="JostMedium">CONTINUE SHOPPING</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
