"use client";

import Image from "next/image";
import Link from "next/link";
import { DollarSign, Minus, Plus, Package, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import useCart from "../../hooks/useCart";

export default function CartPage() {
    const { items, quantity, updateQuantity, removeItem } = useCart();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const t = useTranslations('cart');

    if (items.length === 0) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 text-zinc-700 shadow-sm">
                    <h1 className="text-3xl font-semibold text-zinc-950">{t('empty.title')}</h1>
                    <p className="mt-4 text-base leading-7">{t('empty.description')}</p>
                    <Link
                        href="/"
                        className="mt-6 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                        {t('empty.continueShopping')}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <section className="flex-1 space-y-4">
                    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">{t('summary.title')}</p>
                                <h1 className="mt-2 text-3xl font-semibold text-zinc-950">{quantity} {t('summary.items')}</h1>
                            </div>
                            <Link
                                href="/"
                                className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
                            >
                                {t('summary.continueShopping')}
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500">{t('summary.productsInCart')}</p>
                                        <p className="mt-1 text-2xl font-semibold text-zinc-950">{items.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500">{t('summary.totalQuantity')}</p>
                                        <p className="mt-1 text-2xl font-semibold text-zinc-950">{quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
                                <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)] lg:items-center">
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-zinc-100">
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            loading="eager"
                                            sizes="160px"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="space-y-4 min-w-0">
                                        <div>
                                            <h2 className="text-xl font-semibold text-zinc-950">{item.title}</h2>
                                            <p className="mt-2 text-sm text-zinc-600">${item.price.toFixed(2)} {t('summary.each')}</p>
                                        </div>

                                        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 p-1">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-900 transition hover:bg-zinc-100"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={item.quantity}
                                                    onChange={(event) => {
                                                        const newQuantity = Number(event.target.value);
                                                        if (newQuantity > 0) {
                                                            updateQuantity(item.id, newQuantity);
                                                        }
                                                    }}
                                                    className="h-9 w-20 rounded-full border border-zinc-200 bg-white px-3 text-center text-sm text-zinc-900 outline-none transition focus:border-zinc-950"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-900 transition hover:bg-zinc-100"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                                                <p className="font-medium text-zinc-950 min-w-0 break-words">{t('summary.total')} ${(item.price * item.quantity).toFixed(2)}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    {t('summary.remove')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="w-full max-w-md space-y-4 rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 shadow-sm">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">{t('summary.orderSummary')}</p>
                        <h2 className="mt-2 text-3xl font-semibold text-zinc-950">${total.toFixed(2)}</h2>
                    </div>
                    <div className="rounded-3xl bg-white p-4">
                        <div className="flex items-center justify-between text-sm text-zinc-600">
                            <span className="inline-flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-zinc-400" />
                                {t('summary.estimatedTotal')}
                            </span>
                            <span className="font-semibold">${total.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-zinc-900">
                            <span>{t('summary.items')}</span>
                            <span>{quantity}</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="w-full rounded-3xl bg-zinc-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                        {t('summary.proceedToCheckout')}
                    </button>
                </aside>
            </div>
        </main>
    );
}