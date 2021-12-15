import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
    width: 120,
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
    fontSize: 18,
  },
  quantity: {
    color: "green",
  },
  image: {
    height: 150,
  },
});
