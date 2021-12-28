import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  header: {
    paddingLeft: 5,
    marginTop: 8,
    paddingBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderColor: "gray",
    justifyContent: "space-between",
  },
  subHeader: {
    flexDirection: "row",
    marginRight: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {},
  icons: {
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    padding: 5,
  },
  bgImage: {
    resizeMode: "cover",
    height: 400,
    width: Dimensions.get("window").width,
    marginBottom: 10,
  },

  nameContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    flex: 1,
  },
  sale: {
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginHorizontal: 10,
    color: "white",
    fontSize: 18,
    borderRadius: 10,
  },
  priceContainer: {
    marginVertical: 10,
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 23,

    marginRight: 5,
  },
  initialPrice: {
    textDecorationLine: "line-through",
    fontSize: 15,
    color: "#9BABCD",
  },
  quantityContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 10,
  },
  availability: {
    fontSize: 15,
  },
  quantity: {
    fontSize: 15,
  },
  quantityText: {
    fontSize: 20,
    paddingVertical: 3,
  },
  shortDescontainer: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  select: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectQ: {
    fontSize: 18,
  },
  quantityInputContainer: {
    flexDirection: "row",
    flex: 0.6,
    justifyContent: "space-between",
    marginRight: 30,
    borderWidth: 0.6,
    borderRadius: 5,
    borderColor: "#e3e3e3",
  },
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderTopColor: "lightgray",
    borderTopWidth: 0.5,
    paddingLeft: 20,
  },
  addToCartContainer: {
    backgroundColor: "green",
    marginHorizontal: 15,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    flex: 1,
  },
  addToCart: {
    textAlign: "center",
    fontSize: 18,
    color: "#f2f2f2",
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  descontainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  descriptionTitle: {
    fontSize: 16,
  },
  description: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    fontSize: 16,
  },
});
