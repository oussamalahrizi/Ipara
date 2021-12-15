import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import google from "../../../../assets/icons/google_icon.png";
import facebook from "../../../../assets/icons/fb_icon.png";
import logo from "../../../../assets/icons/ipara_logo.png";
import { useNavigation } from "@react-navigation/core";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";

import * as GoogleSignIn from "expo-google-sign-in";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [hidepwd, setHidepwd] = useState(true);
  const auth = getAuth();
  //S'identifier pressed
  const connect = () => {
    setLoading(true);
    setEmail(email.trim());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("MainStack", { screen: "Account" });
      })
      .catch((e) => {
        setErrorMessage(e.code.split("/")[1].replace(/-/g, " "));
        setLoading(false);
      });
  };

  const loginGoogle = async () => {
    setLoadingScreen(true);
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        const User = await GoogleSignIn.signInSilentlyAsync();
        if (User) {
          const { idToken, accessToken } = User.auth;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
          navigation.navigate("MainStack", { screen: "Account" });
        }
      }
    } catch (err) {
      setLoadingScreen(false);
      if (err.code === "auth/account-exists-with-different-credential") {
        Alert.alert("Error", "Account or Email already exists");
      } else {
        Alert.alert("Error", err.message);
      }
    }
  };

  // const loginFacebook = async () => {
  //   setLoadingScreen(true);
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: "586348629097188",
  //     });

  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ["email", "public_profile"],
  //     });

  //     if (type === "success") {
  //       const credential = FacebookAuthProvider.credential(token);
  //       await signInWithCredential(auth, credential);
  //       setLoadingScreen(false);

  //       // navigation.navigate("MainStack", { screen: "Account" });
  //     }
  //   } catch (err) {
  //     setLoadingScreen(false);
  //     if (err.code === "auth/account-exists-with-different-credential") {
  //       Alert.alert("Error", "Account or Email already exists");
  //     } else {
  //       alert("Error", err.message);
  //     }
  //   }
  // };

  const initAsync = async () => {
    await GoogleSignIn.initAsync();
  };

  useEffect(() => {
    initAsync();
  }, []);
  if (loadingScreen)
    return (
      <ActivityIndicator
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        size={"large"}
        color={"green"}
      />
    );
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Image
          source={logo}
          style={{ resizeMode: "cover", width: 150, height: 150 }}
        />
      </View>
      <Text style={styles.title}>Bonjour!</Text>
      {errorMessage && (
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
            {errorMessage}
          </Text>
        </View>
      )}
      <KeyboardAvoidingView
        enabled
        behavior="position"
        keyboardVerticalOffset={50}
      >
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            secureTextEntry={hidepwd}
            onChangeText={setPassword}
            placeholder="Mot de passe"
          />
          <TouchableOpacity onPress={() => setHidepwd(!hidepwd)}>
            <Feather
              name={hidepwd ? "eye" : "eye-off"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#139E97"
          style={styles.loading}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={email === "" || password === "" ? true : false}
          onPress={connect}
        >
          <Text
            style={[
              styles.login,
              (email === "" || password === "") && { opacity: 0.5 },
            ]}
          >
            S'identifier
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.socials}>
        <TouchableOpacity onPress={loginGoogle} style={styles.socialContainer}>
          <Image
            source={google}
            style={{ width: 20, height: 20, resizeMode: "cover" }}
          />
          <Text style={[styles.socialText, { color: "#FF5B2D" }]}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "center", fontSize: 15 }}>
        Vous n'avez pas encore de compte ?
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
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
          Créer un compte
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;
