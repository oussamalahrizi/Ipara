import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";
import iparaLogo from "../../../../assets/icons/ipara_logo.png";
import { db } from "../../../../config";
import ProductCategory from "../../../Components/ProductCategory";
import { collection, getDocs } from "firebase/firestore";
import StatusText from "../../../Components/StatusText";
import CustomText from "../../../Components/CustomText";
import ProductItem from "../../../Components/ProductItem";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const all = { id: 0, name: "All" };
    setCategories([
      all,
      ...querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ]);
  };
  const fetchData = async () => {
    await fetchProducts();
    await fetchCategories();
    setLoading(false);
  };
  const getfilteredProducts = () => {
    if (selected !== 0) {
      const list = products.filter(
        (item) => item.category === categories.find((i) => i.id === selected).id
      );
      return list;
    } else return products;
  };
  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={iparaLogo} style={styles.logo} resizeMode="contain" />
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.container}
          color="black"
          size="large"
        />
      ) : (
        <View>
          <FlatList
            data={categories}
            horizontal={true}
            contentContainerStyle={{
              marginHorizontal: 10,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setSelected(item.id)}
              >
                <CustomText
                  font="JostRegular"
                  style={[
                    { fontSize: 17, padding: 10 },
                    { color: selected === item.id ? "white" : "black" },
                    selected === item.id && {
                      backgroundColor: "#059c54",
                      borderRadius: 16,
                    },
                  ]}
                  font="JostRegular"
                >
                  {item.name}
                </CustomText>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          {getfilteredProducts().length === 0 ? null : (
            <FlatList
              data={getfilteredProducts()}
              maxToRenderPerBatch={10}
              key={(item) => item.id}
              numColumns={2}
              contentContainerStyle={{
                marginTop: 10,
                alignItems: "center",
              }}
              renderItem={({ item }) => <ProductItem product={item} />}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
