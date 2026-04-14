"use client";

import { useState, type MouseEvent } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import useCart, { type CartProduct } from "../hooks/useCart";
import { useToast } from "./ToastProvider";

interface AddToCartButtonProps {
    product: CartProduct;
    variant?: "full" | "icon";
}

export default function AddToCartButton({ product, variant = "full" }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const { success, error } = useToast();
    const [adding, setAdding] = useState(false);

    const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAdding(true);

        try {
            addItem(product);
            success("Added to cart", `${product.title} is now in your cart.`);
        } catch {
            error("Unable to add item", "Please try again in a moment.");
        } finally {
            window.setTimeout(() => setAdding(false), 250);
        }
    };

    const isIconOnly = variant === "icon";

    return (
        <button
            type="button"
            onClick={handleAdd}
            className={`group inline-flex items-center justify-center rounded-full bg-black text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-70 ${isIconOnly ? "h-10 w-10 px-0" : "gap-2 px-4 py-3 text-sm font-semibold"}`}
            disabled={adding}
            aria-label={adding ? "Adding to cart" : "Add to cart"}
            title={adding ? "Adding to cart" : "Add to cart"}
        >
            {adding ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {!isIconOnly ? <span>Adding...</span> : <span className="sr-only">Adding to cart</span>}
                </>
            ) : (
                <>
                    <ShoppingCart className="h-4 w-4" />
                    {!isIconOnly ? (
                        <span>Add to Cart</span>
                    ) : (
                        <span className="sr-only">Add to Cart</span>
                    )}
                </>
            )}
        </button>
    );
}
