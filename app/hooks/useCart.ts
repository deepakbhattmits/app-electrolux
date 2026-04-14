"use client";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    addItem as addItemAction,
    removeItem as removeItemAction,
    updateQuantity as updateQuantityAction,
} from "../store/cartSlice";

export type CartProduct = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

export default function useCart() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    const quantity = useMemo(
        () => items.reduce((count, item) => count + item.quantity, 0),
        [items]
    );

    const addItem = (product: CartProduct) => {
        dispatch(addItemAction(product));
    };

    const updateQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantityAction({ id, quantity }));
    };

    const removeItem = (id: number) => {
        dispatch(removeItemAction(id));
    };

    return {
        items,
        quantity,
        addItem,
        updateQuantity,
        removeItem,
    };
}
