import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import type { CartItem } from "./cartSlice";

function loadCartState() {
    if (typeof window === "undefined") {
        return undefined;
    }

    try {
        const stored = window.localStorage.getItem("cart");
        if (!stored) return undefined;
        const items = JSON.parse(stored) as CartItem[];
        return { cart: { items } };
    } catch {
        return undefined;
    }
}

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: loadCartState(),
});

store.subscribe(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
