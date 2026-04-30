"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import useCart from "../hooks/useCart";
import ThemeChanger from "./ThemeChanger";

export default function SiteHeader() {
    const pathname = usePathname();
    const { items, quantity } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const showCartDropdown = !pathname.includes("/cart");
    const cartQuantity = isMounted ? quantity : 0;
    const cartItems = isMounted ? items : [];
    const t = useTranslations('header');
    const langT = useTranslations('language');
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
        setLangDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                <Link href={`/${locale}`} className="text-lg font-semibold text-zinc-950">
                    {t('title')}
                </Link>

                <div className="flex items-center gap-3 text-sm text-zinc-600">
                    {/* Language Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-200 hover:text-zinc-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                        >
                            {locale.toUpperCase()}
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {langDropdownOpen && (
                            <div className="absolute right-0 z-50 mt-3 w-40 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white text-left shadow-xl">
                                <div className="p-2">
                                    <button
                                        onClick={() => handleLanguageChange('en')}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100"
                                    >
                                        {langT('english')}
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange('es')}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100"
                                    >
                                        {langT('spanish')}
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange('fr')}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100"
                                    >
                                        {langT('french')}
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange('ar')}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100"
                                    >
                                        {langT('arabic')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart Section */}
                    <div
                        className="relative flex items-center gap-3 text-sm text-zinc-600"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        {showCartDropdown ? (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => router.push(`/${locale}/cart`)}
                                    className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-200 hover:text-zinc-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                                    aria-label="View cart items"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    {t('cart.items')} {cartQuantity}
                                </button>

                                <div className={`absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white text-left shadow-xl transition duration-200 pointer-events-auto ${dropdownOpen ? "block" : "hidden"}`}>
                                    <div className="p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t('cart.preview')}</p>
                                        <h2 className="mt-2 text-lg font-semibold text-zinc-950">{cartQuantity} {cartQuantity === 1 ? t('cart.item') : t('cart.items')}</h2>
                                    </div>
                                    <div className="max-h-72 overflow-y-auto border-t border-zinc-200/80 px-4 py-3">
                                        {cartItems.length === 0 ? (
                                            <p className="text-sm text-zinc-600">{t('cart.empty')}</p>
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
                                                        <p className="mt-1 text-xs text-zinc-600">{t('cart.quantity')} {item.quantity}</p>
                                                    </div>
                                                    <p className="whitespace-nowrap text-sm font-semibold text-zinc-950">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="border-t border-zinc-200/80 bg-zinc-50 px-4 py-3">
                                        <Link
                                            href={`/${locale}/cart`}
                                            className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                                        >
                                            {t('cart.viewFull')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={`/${locale}/cart`}
                                className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-200 hover:text-zinc-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                                aria-label="View cart items"
                            >
                                {t('cart.items')} {cartQuantity}
                            </Link>
                        )}
                        <ThemeChanger />
                    </div>
                </div>
            </div>
        </header>
    );
}
