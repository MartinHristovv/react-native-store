import React, { useState, useMemo, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Button,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";
import { fetchProducts } from "../api/products";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default function ProductsListScreen() {
  const navigation = useNavigation<any>();
  const { setToken } = useAuthStore();
  const [search, setSearch] = useState("");

  const {
    data: products = [],
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Logout" onPress={() => setToken(null)} color="#ef4444" />
      ),
    });
  }, [navigation]);

  const fuse = useMemo(
    () => new Fuse(products, { keys: ["title"], threshold: 0.4 }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return fuse.search(search).map((res) => res.item);
  }, [search, fuse, products]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            No products found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 12,
  },
  search: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#059669",
    marginTop: 4,
  },
});
