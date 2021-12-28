import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../Components/CustomText";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import {
  ClearCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../../redux/CartSlice";
import { useNavigation } from "@react-navigation/core";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  const handleClear = () => {
    Alert.alert("Are you sure you want to clear the cart?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => dispatch(ClearCart()) },
    ]);
  };
  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item));
  };
  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item));
  };
  const handleDelete = (item) => {
    dispatch(deleteFromCart(item));
  };

  const handleShopping = () => {
    navigation.goBack();
  };
  const handleCheckout = () => {
    navigation.navigate("CheckoutScreen");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginTop: 60 }}>
        <CustomText style={styles.title} font="JostMedium">
          My Cart
        </CustomText>
      </View>
      {cart.items.length === 0 ? (
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={styles.emptyContainer}>
            <CustomText font="JostMedium">Your Cart is empty</CustomText>
            <CustomText style={styles.emptyDescription} font="JostRegular">
              Looks like you haven't added any items to items to the bag yet.
            </CustomText>
            <CustomText style={{ fontSize: 13 }} font="JostRegular">
              Start shopping to fill it in.
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={handleShopping}
            style={styles.shoppingButton}
          >
            <AntDesign
              name="creditcard"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <CustomText font="JostMedium">START SHOPPING</CustomText>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.totalContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText
                style={{ fontSize: 18, color: "green" }}
                font="JostMedium"
              >
                TOTAL
              </CustomText>
              <CustomText
                style={{ fontSize: 16, color: "green" }}
                font="JostRegular"
              >
                {"  "}
                {cart.totalQuantity} items
              </CustomText>
            </View>

            <TouchableOpacity onPress={handleClear}>
              <CustomText style={{ color: "#f23f3f" }} font="JostMedium">
                CLEAR CART
              </CustomText>
            </TouchableOpacity>
          </View>
          {cart.items.map((item) => (
            <View key={item.id}>
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Image
                  resizeMode="cover"
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View>
                  <CustomText font="JostRegular">{item.name}</CustomText>
                  <CustomText
                    style={{ paddingTop: 5, fontSize: 16 }}
                    font="JostMedium"
                  >
                    {item.price} DH
                  </CustomText>
                  <View style={styles.quantityInputContainer}>
                    <TouchableOpacity
                      onPress={() => handleDecrease(item)}
                      style={styles.icons}
                    >
                      <AntDesign name="minus" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.itemQuantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleIncrease(item)}
                      style={styles.icons}
                    >
                      <AntDesign name="plus" size={25} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.bottomConclusion}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomText font="JostRegular" style={{ fontSize: 17 }}>
                Products
              </CustomText>
              <CustomText style={{ fontSize: 20 }} font="JostRegular">
                x{cart.totalQuantity}
              </CustomText>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomText font="JostMedium" style={{ fontSize: 25 }}>
                Total :
              </CustomText>
              <CustomText font="JostRegular" style={{ fontSize: 25 }}>
                {cart.totalPrice} DH
              </CustomText>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleCheckout}
            style={styles.shoppingButton}
          >
            <AntDesign
              name="creditcard"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <CustomText font="JostMedium">CHECKOUT</CustomText>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;
