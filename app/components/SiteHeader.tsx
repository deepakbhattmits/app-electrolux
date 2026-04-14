"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import useCart from "../hooks/useCart";

export default function SiteHeader() {
    const pathname = usePathname();
    const { items, quantity } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const showCartDropdown = pathname === "/" || pathname.startsWith("/products");
    const cartQuantity = isMounted ? quantity : 0;
    const cartItems = isMounted ? items : [];

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const router = useRouter();

    return (
        <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                <Link href="/" className="text-lg font-semibold text-zinc-950">
                    App Eletrolux
                </Link>

                <div
                    className="relative flex items-center gap-3 text-sm text-zinc-600"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    {showCartDropdown ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => router.push("/cart")}
                                className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-200 hover:text-zinc-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                                aria-label="View cart items"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Cart items: {cartQuantity}
                            </button>

                            <div className={`absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white text-left shadow-xl transition duration-200 pointer-events-auto ${dropdownOpen ? "block" : "hidden"}`}>
                                <div className="p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Cart preview</p>
                                    <h2 className="mt-2 text-lg font-semibold text-zinc-950">{cartQuantity} item{cartQuantity === 1 ? "" : "s"}</h2>
                                </div>
                                <div className="max-h-72 overflow-y-auto border-t border-zinc-200/80 px-4 py-3">
                                    {cartItems.length === 0 ? (
                                        <p className="text-sm text-zinc-600">Your cart is empty.</p>
                                    ) : (
                                        cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 border-b border-zinc-200/80 py-3 last:border-b-0">
                                                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-zinc-100">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold text-zinc-950">{item.title}</p>
                                                    <p className="mt-1 text-xs text-zinc-600">Qty {item.quantity}</p>
                                                </div>
                                                <p className="whitespace-nowrap text-sm font-semibold text-zinc-950">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="border-t border-zinc-200/80 bg-zinc-50 px-4 py-3">
                                    <Link
                                        href="/cart"
                                        className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                                    >
                                        View full cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-200 hover:text-zinc-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                            aria-label="View cart items"
                        >
                            Cart items: {quantity}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
