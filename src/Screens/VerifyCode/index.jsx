import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import google from "../../../assets/icons/google_icon.png";
import facebook from "../../../assets/icons/fb_icon.png";
import logo from "../../../assets/icons/ipara_logo.png";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { getAuth, PhoneAuthProvider } from "firebase/auth";
import { db } from "../../../config";
import { addDoc, collection } from "@firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { getApp } from "@firebase/app";
const Register = () => {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  const app = getApp();
  const auth = getAuth();
  const sendCode = async () => {
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+212" + phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      navigation.navigate("VerifyCode", { verificationId });
    } catch (err) {
      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  };
  const createAccount = () => {
    setLoading(true);
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    if (phoneNumber === "" || firstName === "" || lastName === "") {
      setErrorMessage("All fields must not be empty");
      setLoading(false);
    } else if (
      phoneNumber.length < 9 ||
      (phoneNumber[0] !== "6" && phoneNumber[0] !== "7")
    ) {
      setErrorMessage("phone number is not correct");
      setLoading(false);
    } else {
      setErrorMessage(null);
      sendCode();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      style={styles.container}
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        androidHardwareAccelerationDisabled
        attemptInvisibleVerification={true}
        onTouchCancel={Register}
      />
      <View style={styles.logo}>
        <Image
          source={logo}
          style={{ resizeMode: "cover", width: 150, height: 150 }}
        />
      </View>

      <Text style={styles.title}>Créer un compte</Text>
      {errorMessage && (
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
            {errorMessage}
          </Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Prénom"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Nom"
      />
      <View
        style={{
          backgroundColor: "#EDEEF1",
          borderRadius: 10,
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={{ fontSize: 16, paddingLeft: 15 }}>🇲🇦 +212</Text>
        <TextInput
          style={[styles.input, { flex: 0.9 }]}
          value={phoneNumber}
          s
          onChangeText={(e) => setPhoneNumber(e.replace(/[^\d]/g, ""))}
          placeholder="Phone Number"
          maxLength={9}
          keyboardType="phone-pad"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#139E97" style={styles.s} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={phoneNumber.length < 9}
          onPress={createAccount}
        >
          <Text
            style={[styles.login, phoneNumber.length < 9 && { opacity: 0.5 }]}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.socials}>
        <View style={styles.socialContainer}>
          <Image
            source={google}
            style={{ width: 20, height: 20, resizeMode: "cover" }}
          />
          <Text style={[styles.socialText, { color: "#FF5B2D" }]}>Google</Text>
        </View>
        <View style={styles.socialContainer}>
          <Image
            source={facebook}
            style={{ width: 30, height: 30, resizeMode: "cover" }}
          />
          <Text style={[styles.socialText, { color: "#4B69A3" }]}>
            Facebook
          </Text>
        </View>
      </View>

      <Text style={{ textAlign: "center", fontSize: 15 }}>
        Vous avez déjà un compte ?
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text
          style={{
            color: "#139E97",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 15,
          }}
        >
          {" "}
          S'identifier
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Register;
