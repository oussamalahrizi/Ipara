import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    flexShrink: 1,
  },
  initialPrice: {
    textDecorationLine: "line-through",
    opacity: 0.6,
    fontSize: 14,
  },
  price: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 10,
  },
  quantity: {
    color: "green",
  },
  image: {
    height: 200,
    width: 150,
  },
});
