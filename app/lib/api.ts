import axios from "axios";

type Product = {
    id: number;
    title: string;
    description?: string;
    price: number;
    thumbnail: string;
};

const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000,
});

export async function fetchProducts() {
    const response = await api.get<{ products: Product[] }>("/products?limit=24");
    return response.data.products;
}

export async function fetchProductById(productId: string) {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
}

export type { Product };
