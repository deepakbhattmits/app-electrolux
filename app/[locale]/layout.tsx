import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Providers from '../providers';
import SiteHeader from '../components/SiteHeader';
import LocaleDirectionSetter from './LocaleDirectionSetter';

export default async function LocaleLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Set request locale for server components
    setRequestLocale(locale);

    const messages = (await import(`../../messages/${locale}.json`)).default;

    return (
        <>
            <LocaleDirectionSetter locale={locale} />
            <NextIntlClientProvider messages={messages} locale={locale}>
                <Providers>
                    <SiteHeader />
                    {children}
                </Providers>
            </NextIntlClientProvider>
        </>
    );
}