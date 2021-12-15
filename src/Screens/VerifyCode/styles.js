import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: "#EDEEF1",
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 16,
    marginVertical: 5,
  },
  loading: {
    marginVertical: 30,
    paddingVertical: 13,
  },
  login: {
    marginVertical: 30,
    textAlign: "center",
    backgroundColor: "#139E97",
    fontSize: 18,
    borderRadius: 15,
    paddingVertical: 13,
    color: "white",
    // shadowColor: "#000000",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  infoContainer: {
    textAlign: "center",
  },
  title: {
    color: "#777879",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  socials: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  socialContainer: {
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EDEEF1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  socialText: {
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  logo: {
    alignItems: "center",
  },
  passwordContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: "#EDEEF1",
    borderRadius: 10,
    marginBottom: 5,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordInput: {
    fontSize: 16,
    flexBasis: "90%",
  },
});
