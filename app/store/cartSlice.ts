import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
        addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (!existing) return;

            if (action.payload.quantity <= 0) {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            } else {
                existing.quantity = action.payload.quantity;
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addItem, setItems, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
