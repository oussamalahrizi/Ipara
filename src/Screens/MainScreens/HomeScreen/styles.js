import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  IconBadge: {
    backgroundColor: "#f23f3f",
  },
});
