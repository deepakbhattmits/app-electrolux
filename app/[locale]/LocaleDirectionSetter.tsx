'use client';

import { useEffect } from 'react';

export default function LocaleDirectionSetter({ locale }: { locale: string }) {
    useEffect(() => {
        const direction = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = direction;
        document.documentElement.lang = locale;
    }, [locale]);

    // This component doesn't render anything, it only sets HTML attributes
    return null;
}
