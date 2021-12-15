import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./styles";
import google from "../../../../assets/icons/google_icon.png";
import facebook from "../../../../assets/icons/fb_icon.png";
import logo from "../../../../assets/icons/ipara_logo.png";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import * as GoogleSignIn from "expo-google-sign-in";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import { db } from "../../../../config";
import { setDoc, doc, collection } from "@firebase/firestore";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hidepwd, setHidepwd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigation = useNavigation();

  const newUser = async (uid, displayName, mobile, address, email) => {
    await setDoc(doc(db, "users", uid), {
      email,
      address,
      mobile,
      displayName,
      uid,
    });
  };

  const createAccount = () => {
    setLoading(true);
    setEmail(email.trim());
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    if (email === "" || firstName === "" || lastName === "") {
      setErrorMessage("All fields must not be empty");
      setLoading(false);
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          newUser(user.uid, `${firstName} ${lastName}`, "", "", email);
          navigation.navigate("MainStack", { screen: "Account" });
        })
        .catch((e) => {
          setErrorMessage(e.code.split("/")[1].replace(/-/g, " "));
          setLoading(false);
        });
    }
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
  const initAsync = async () => {
    await GoogleSignIn.initAsync();
  };

  useEffect(() => {
    initAsync();
  }, []);
  if (loadingScreen) {
    <ActivityIndicator
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      size={"large"}
      color={"green"}
    />;
  }
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
          <Feather name={hidepwd ? "eye" : "eye-off"} size={24} color="grey" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#139E97"
          style={styles.loading}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.8} onPress={createAccount}>
          <Text style={styles.login}>Create Account</Text>
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
