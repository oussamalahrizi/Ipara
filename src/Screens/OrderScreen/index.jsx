import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import StatusText from "../../Components/StatusText";
import CustomText from "../../Components/CustomText";
import { getAuth } from "firebase/auth";
import {
  query,
  getDocs,
  where,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config";
import OrderItem from "../../Components/OrderItem";
import { Divider } from "react-native-elements";

const OrderScreen = () => {
  const auth = getAuth();
  const orderStatus = [
    { id: 0, text: "All" },
    { id: 1, text: "Requested" },
    { id: 2, text: "Processing" },
    { id: 3, text: "Delivered" },
  ];
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  // fetch orders by the user connected
  const fetchProducts = async () => {
    const userId = auth.currentUser.uid;
    const q = query(collection(db, "orders"), where("userUid", "==", userId));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));

    for (let item of result) {
      const products = [];
      for (let product of item.products) {
        const docRef = doc(db, "products", product.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          products.push({
            ...docSnap.data(),
            id: docSnap.id,
            itemQuantity: product.itemQuantity,
          });
        }
      }
      setOrders((prev) => [
        ...prev,
        {
          id: item.docId,
          products,
          requestedAt: item.requestedAt,
          totalPrice: item.totalPrice,
          status: item.status,
        },
      ]);
    }
    setLoading(false);
  };

  const getfilteredOrders = () => {
    if (selected !== 0) {
      const list = orders.filter(
        (item) =>
          item.status === orderStatus.find((i) => i.id === selected).text
      );
      return list;
    } else return orders;
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <CustomText font="JostMedium" style={styles.title}>
        My Orders
      </CustomText>
      <View style={styles.filterContainer}>
        {orderStatus.map((item) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={item.id}
            onPress={() => setSelected(item.id)}
          >
            <StatusText
              style={styles.filterItemText}
              selected={selected}
              item={item}
            />
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={"green"}
          style={{ alignSelf: "center", flex: 1 }}
        />
      ) : orders.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <CustomText
            font={"JostRegular"}
            style={{ textAlign: "center", fontSize: 18 }}
          >
            No Orders
          </CustomText>
        </View>
      ) : getfilteredOrders().length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <CustomText
            font={"JostRegular"}
            style={{ fontSize: 18, textAlign: "center" }}
          >
            No {orderStatus.find((i) => i.id === selected).text} Items
          </CustomText>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getfilteredOrders()}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const date = item.requestedAt.split(" ").splice(1, 4);
            return (
              <View>
                <View
                  style={{
                    margin: 5,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "lightgray",
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      paddingLeft: 13,
                      paddingTop: 5,
                    }}
                  >
                    <CustomText key={item.id} font={"JostRegular"}>
                      {date[1]} - {date[0]} - {date[2]} at{" "}
                      {date[3].split("").splice(0, 5)}
                    </CustomText>
                  </View>
                  {item.products.map((product, index) => (
                    <View key={product.id}>
                      <OrderItem product={product} />
                      {index !== item.products.length - 1 && (
                        <Divider
                          key={product.id}
                          style={{
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
                          orientation="horizontal"
                          width={0.8}
                          color="lightgray"
                        />
                      )}
                    </View>
                  ))}

                  <View style={{ flexDirection: "row-reverse", padding: 8 }}>
                    <CustomText font={"JostRegular"} style={{ fontSize: 16 }}>
                      Total :{" "}
                      <CustomText font={"JostBold"}>
                        {" "}
                        {item.totalPrice} DH
                      </CustomText>{" "}
                    </CustomText>
                  </View>
                </View>
                {index !== getfilteredOrders().length - 1 && (
                  <Divider
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 10,
                      opacity: 0.33,
                    }}
                    orientation="horizontal"
                    width={0.8}
                    color="black"
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default OrderScreen;
