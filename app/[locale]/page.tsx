import Image from "next/image";
import Link from "next/link";
// import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchProducts, type Product } from "../lib/api";
import BackToTopButton from "../components/BackToTopButton";

export default async function Home({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Set request locale for this component
    setRequestLocale(locale);

    // const t = useTranslations('productPage');
    const t = await getTranslations('productPage');
    let products: Product[] = [];

    try {
        products = await fetchProducts();
    } catch {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="rounded-3xl border border-red-200/80 bg-red-50 p-8 text-red-900 shadow-sm">
                    <h1 className="text-2xl font-semibold">Unable to load products</h1>
                    <p className="mt-3">There was a problem retrieving the product list. Please refresh the page.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="mb-8 rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
                <h1 className="text-4xl font-semibold text-zinc-950">{t('productTitle')}</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <Link href={`/${locale}/products/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                loading="eager"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
                            <div>
                                <Link href={`/${locale}/products/${product.id}`} className="block">
                                    <h2 className="text-lg font-semibold text-zinc-950">{product.title}</h2>
                                    <p className="mt-2 text-sm font-semibold text-zinc-900">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <BackToTopButton />
        </main>
    );
}