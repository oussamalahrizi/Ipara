import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../../Components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config";
import ProductItemSearch from "../../../Components/ProductItemSearch";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/core";
const SearchScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [recents, setRecents] = useState([]);
  const [products, setProducts] = useState([]);
  const textRef = useRef();
  const getRecents = async () => {
    const res = (await AsyncStorage.getItem("recentSearch")) || "[]";
    setRecents(JSON.parse(res));
  };

  const setRecentSearch = async (name) => {
    const list = recents;
    if (list.findIndex((i) => i === name) === -1) {
      list.push(name);
      await AsyncStorage.setItem("recentSearch", JSON.stringify(list));
      setRecents(list);
    }
    Keyboard.dismiss();
  };
  const clearSearch = async () => {
    await AsyncStorage.clear();
    setRecents([]);
  };
  const removeItemSearch = async (item) => {
    const list = recents.filter((i) => i !== item);
    await AsyncStorage.setItem("recentSearch", JSON.stringify(list));
    setRecents(list);
  };

  const fetchProduct = () =>
    value.length >= 3
      ? products.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];

  useEffect(() => {
    getRecents();

    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
    textRef.current.focus();
    return unsub;
  }, [loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <TextInput
            ref={textRef}
            value={value}
            onChangeText={setValue}
            style={{
              fontSize: 16,
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            placeholder="search a product"
            returnKeyType="search"
            onSubmitEditing={() => value !== "" && setRecentSearch(value)}
          />
          <TouchableOpacity
            onPress={() => {
              setValue("");
              textRef.current.focus();
            }}
          >
            <FontAwesome name="remove" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setRecentSearch(value)}
          disabled={value === "" && true}
        >
          <CustomText
            font={"JostMedium"}
            style={{ fontSize: 16, opacity: value === "" ? 0.4 : 1 }}
          >
            Search
          </CustomText>
        </TouchableOpacity>
      </View>
      {!loading && recents.length !== 0 && (
        <View>
          {value === "" && (
            <>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomText font={"JostMedium"} style={{ fontSize: 16 }}>
                  Recently Searched
                </CustomText>
                <TouchableOpacity onPress={clearSearch}>
                  <FontAwesome name="trash-o" size={20} color="gray" />
                </TouchableOpacity>
              </View>
              <CustomText style={{ marginLeft: 20 }}>
                {recents.map((item, index) => (
                  <View key={index}>
                    <CustomText
                      key={index}
                      font={"JostRegular"}
                      style={styles.searchItem}
                    >
                      <TouchableOpacity onPress={() => removeItemSearch(item)}>
                        <FontAwesome name="remove" size={15} color="black" />
                      </TouchableOpacity>
                      {"  "}
                      <TouchableOpacity onPress={() => setValue(item)}>
                        <CustomText>{item}</CustomText>
                      </TouchableOpacity>
                    </CustomText>
                  </View>
                ))}
              </CustomText>
            </>
          )}
        </View>
      )}
      {fetchProduct().length !== 0 ? (
        <FlatList
          data={fetchProduct()}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            marginHorizontal: 10,
            marginTop: 10,
            flex: 1,
            alignItems: "center",
            backgroundColor: "#F7F8FA",
          }}
          renderItem={({ item }) => (
            <View key={item.id}>
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setRecentSearch(item.name);
                  navigation.navigate("ProductScreen", { product: item });
                }}
              >
                <ProductItemSearch key={item.id} product={item} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <CustomText
            font={"JostRegular"}
            style={{ textAlign: "center", fontSize: 16 }}
          >
            Search for products in our store.
          </CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
