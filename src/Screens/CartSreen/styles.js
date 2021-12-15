import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  title: {
    fontSize: 40,
    marginTop: 10,
    paddingLeft: 10,
  },
  back: {
    marginTop: -20,
    padding: 10,
  },
  totalContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F2F4",
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F1F2F4",
    paddingLeft: 10,
  },
  productImage: {
    width: 120,
    height: 120,
  },

  quantityInputContainer: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  quantityText: {
    fontSize: 20,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  icons: {
    backgroundColor: "#e3e3e3",
    padding: 5,
    borderRadius: 5,
    borderColor: "#e3e3e3",
  },
  bottomConclusion: {
    backgroundColor: "#F1F2F4",
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 10,
    marginTop: 30,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: -60,
  },
  emptyDescription: {
    marginTop: 8,
    paddingHorizontal: 10,
    fontSize: 13,
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
