import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Product } from "./ProductsListScreen";

type ProductDetailRouteProp = RouteProp<
  { params: { product: Product } },
  "params"
>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.ratingBox}>
        <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
        <Text style={styles.count}>({product.rating.count} reviews)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#059669",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    color: "#f4a261",
    marginRight: 6,
  },
  count: {
    fontSize: 14,
    color: "#999",
  },
});
