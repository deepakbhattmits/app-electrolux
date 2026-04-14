import Link from "next/link";
import AddToCartButton from "../../components/AddToCartButton";
import ProductImageMagnifier from "../../components/ProductImageMagnifier";
import type { Metadata } from "next";
import { fetchProductById, type Product } from "../../lib/api";

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
    const { productId } = await params;

    try {
        const product = await fetchProductById(productId);
        return { title: product.title, description: product.description };
    } catch {
        return { title: "Product not found" };
    }
}

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    let product: Product | null = null;

    try {
        product = await fetchProductById(productId);
    } catch {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="rounded-3xl border border-red-200/80 bg-red-50 p-8 text-red-900 shadow-sm">
                    <h1 className="text-2xl font-semibold">Product load failed</h1>
                    <p className="mt-3">There was a problem fetching the product details. Please try again later.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
                <ProductImageMagnifier src={product.thumbnail} alt={product.title} />
                <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Product</p>
                            <h1 className="mt-2 text-4xl font-semibold text-zinc-950">{product.title}</h1>
                        </div>
                        <Link
                            href="/"
                            className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
                        >
                            Back to products
                        </Link>
                    </div>
                    <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6">
                        <p className="text-lg leading-8 text-zinc-700">{product.description}</p>
                        <div className="mt-6 flex items-center justify-between gap-4">
                            <p className="text-3xl font-semibold text-zinc-950">${product.price}</p>
                            <AddToCartButton
                                product={{
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    thumbnail: product.thumbnail,
                                }}
                                variant="full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
