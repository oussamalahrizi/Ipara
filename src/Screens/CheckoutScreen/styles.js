import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Title: {
    flex: 0.1,
    fontSize: 26,
    letterSpacing: 1.5,
  },
  message: {
    flex: 0.2,
    textAlign: "center",
    fontSize: 16,
  },
  shoppingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CFE8E5",
    justifyContent: "center",
    marginBottom: "20%",
    padding: 15,
    marginHorizontal: "25%",
    borderRadius: 40,
  },
});
