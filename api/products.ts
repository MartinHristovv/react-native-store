import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig?.extra?.API_URL;

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};