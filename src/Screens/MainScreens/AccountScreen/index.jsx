import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./styles";
import CustomButton from "../../../Components/CustomButton";
import CustomText from "../../../Components/CustomText";
import { useNavigation } from "@react-navigation/core";
import logo from "../../../../assets/icons/ipara_logo.png";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../../config";
import { AntDesign } from "@expo/vector-icons";

import * as GoogleSignin from "expo-google-sign-in";
import { Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ToastAndroid } from "react-native";
const AccountSreen = () => {
  // user state is the data coming from firestore doc that hold user's other infos
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState("");
  const mobileRef = useRef();
  const addressRef = useRef();
  const fullNameRef = useRef();
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [saveInfo, setSaveinfo] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const gotoLogin = () => {
    navigation.navigate("AuthStack");
  };
  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    const isSignedIn = await GoogleSignin.isSignedInAsync();
    if (isSignedIn) await GoogleSignin.signOutAsync();
    setLoading(false);
  };
  // create new user if doesnt exist if the provider is google
  const newUser = async (uid, displayName, mobile, address, email) => {
    await setDoc(doc(db, "users", uid), {
      email,
      address,
      mobile,
      displayName,
      uid,
    });
  };

  // get user info from firebase
  const getUserInfo = async (User) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", User.uid));
    const querysnapshot = await getDocs(q);
    const res = querysnapshot.docs.map((doc) => doc.data())[0];
    if (!res) {
      const displayName = User.displayName ? User.displayName : "";
      const mobile = User.phoneNumber ? User.phoneNumber : "";
      newUser(User.uid, displayName, mobile, "", User.email);
      getUserInfo(User);
    } else {
      setUser({ ...res });
      // toggling saveinfo -> false so it doesn't show up
      //because of address state update on mounts
      setAddress(res.address);
      setFullName(res.displayName);
      setMobile(res.mobile.split("+212")[1]);
      setSaveinfo(false);
      setLoading(false);
    }
  };

  // const handleEditMobile = async () => {
  //   if (mobile === "" || mobile.length < 9) {
  //     setDialogError("incorrect mobile");
  //   } else if (mobile[0] !== "6" && mobile[0] !== "7") {
  //     setDialogError("phone number is not correct");
  //   } else if ("+212" + mobile === user.mobile) {
  //     setVisible(false);
  //     setDialogError(null);
  //   } else {
  //     setVisible(false);
  //     setLoading(true);
  //     setDialogError(null);
  //     try {
  //       const docref = doc(db, "users", user.docId);
  //       // spread user props except docId and store them into variale data
  //       const { docId, ...data } = user;
  //       const payload = { ...data, mobile: "+212" + mobile };
  //       await setDoc(docref, payload);
  //       getUserInfo(user);
  //       setLoading(false);
  //     } catch (error) {
  //       Alert.alert(error.message);
  //       setLoading(false);
  //     }
  //   }
  // };
  const handleSaveInfo = async () => {
    setLoading(true);
    if (
      mobile === "" ||
      mobile.length < 9 ||
      (mobile[0] !== "6" && mobile[0] !== "7")
    ) {
      ToastAndroid.show("Incorrect mobile number", ToastAndroid.SHORT);
      setLoading(false);
      mobileRef.current.focus();
    } else if (
      "+212" + mobile === user.mobile &&
      address === user.address &&
      fullName === user.displayName
    ) {
      setLoading(false);
      setSaveinfo(false);
    } else if (fullName === "") {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      setLoading(false);
      fullNameRef.current.focus();
    } else if (address === "") {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      setLoading(false);
      addressRef.current.focus();
    } else {
      try {
        const docref = doc(db, "users", user.uid);
        // spread user props except docId and store them into variale data
        const payload = {
          ...user,
          mobile: "+212" + mobile,
          address,
          displayName: fullName,
        };
        await setDoc(docref, payload);
        getUserInfo(user);
        setSaveinfo(false);
        setLoading(false);
        ToastAndroid.show("Saved successfully", ToastAndroid.SHORT);
      } catch (error) {
        Alert.alert("", error.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        getUserInfo(user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [auth]);
  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
        color="green"
      />
    );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <CustomText
          style={{ marginTop: -10, fontSize: 12, color: "white" }}
          font="JostRegular"
        >
          Your favorite online parapharmacy
        </CustomText>
        <CustomText
          font="JostBold"
          style={{
            fontSize: 30,
            color: "white",
            marginLeft: -150,
            marginVertical: 16,
          }}
        >
          Settings
        </CustomText>
      </View>

      {user ? (
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomText
              font="JostBold"
              style={{
                fontSize: 25,
                paddingLeft: 10,
                marginVertical: 12,
              }}
            >
              My Profile
            </CustomText>

            {saveInfo && (
              <TouchableOpacity
                style={{ paddingRight: 10, marginVertical: 12 }}
                onPress={handleSaveInfo}
              >
                <CustomText
                  font="JostRegular"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    fontSize: 15,
                  }}
                >
                  Save
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
          <CustomText
            style={{ fontSize: 18, paddingLeft: 20, paddingTop: 5 }}
            font="JostMedium"
          >
            Full Name
          </CustomText>
          <TextInput
            style={{
              fontSize: 18,
              opacity: 0.8,
              paddingLeft: 20,
            }}
            value={fullName}
            ref={fullNameRef}
            multiline={true}
            onChangeText={(e) => {
              setFullName(e);
              setSaveinfo(true);
            }}
            placeholder={"Please enter your full name"}
          />
          <View>
            <CustomText
              style={{ fontSize: 18, paddingLeft: 20 }}
              font="JostMedium"
            >
              Email
            </CustomText>
            <CustomText
              style={{ fontSize: 20, paddingLeft: 20, opacity: 0.5 }}
              font="JostRegular"
            >
              {user.email}
            </CustomText>

            <CustomText
              style={{ fontSize: 18, marginLeft: 20 }}
              font="JostMedium"
            >
              Mobile
            </CustomText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText
                style={{ fontSize: 18, opacity: 0.8, marginLeft: 20 }}
              >
                🇲🇦 +212
              </CustomText>
              <TextInput
                style={{
                  fontSize: 18,
                  opacity: 0.8,
                  paddingLeft: 3,
                }}
                ref={mobileRef}
                value={mobile}
                placeholder="your Mobile Number"
                maxLength={9}
                keyboardType="phone-pad"
                onChangeText={(e) => {
                  setMobile(e.replace(/[^\d]/g, ""));
                  setSaveinfo(true);
                }}
              />
            </View>
            <CustomText
              style={{ fontSize: 18, paddingVertical: 10, marginLeft: 20 }}
              font="JostMedium"
            >
              Address
            </CustomText>
            <TextInput
              style={{
                fontSize: 18,
                opacity: 0.8,
                paddingLeft: 20,
              }}
              value={address}
              ref={addressRef}
              multiline={true}
              onChangeText={(e) => {
                setAddress(e);
                setSaveinfo(true);
              }}
              placeholder={"Please enter your address"}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            marginTop: 16,
          }}
        >
          <CustomButton onpress={gotoLogin} icon="user" text="Login" />
        </View>
      )}
      <CustomText style={{ fontSize: 23, padding: 12 }} font="JostBold">
        General Settings
      </CustomText>
      <CustomButton text="My Wishlist" icon="hearto" />
      {user && <CustomButton onpress={logout} text="Logout" icon="logout" />}
    </ScrollView>
  );
};

export default AccountSreen;
