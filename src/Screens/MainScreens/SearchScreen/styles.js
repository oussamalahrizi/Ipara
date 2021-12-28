import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 10,

    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 8,
    alignItems: "center",
  },
  searchItem: {
    backgroundColor: "#F7F8FA",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
  },
});
