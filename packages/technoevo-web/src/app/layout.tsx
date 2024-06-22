import '../styles/globals.css';
import 'jodit/build/jodit.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/lib/Providers';
import Header from '@/components/Main/Header';
import Footer from '@/components/Main/Footer';
import Toast from '@/lib/Toast';
import Script from 'next/script';
import { siteConfig } from '@/config/site';
import { getAllBlogs } from '@/services/blogApi';
import { iBlogResponse } from '@/types/iBlog';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords.map(key => key),
    authors: [
        {
            name: 'AbdELrahman',
            url: 'https://www.technoevo.online',
        },
    ],
    creator: 'AbdElrahman',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    openGraph: {
        type: 'website',
        locale: 'en',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        // images: [
        //   {
        //     url: siteConfig.ogImage,
        //     width: 1200,
        //     height: 630,
        //     alt: siteConfig.name,
        //   },
        // ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@TechnoEvo',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const allBlogs: iBlogResponse = await getAllBlogs();

    return (
        <html lang='en'>
            <head>
                <Script
                    id='Absence-banner'
                    async
                    strategy='afterInteractive'
                    // onError={(e) => {
                    //   console.error('Script failed to load', e);
                    // }}
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
                    crossOrigin='anonymous'
                />
            </head>
            <body className={`bg-[#F5F6F7] ${inter.className}`}>
                <Providers>
                    <Toast />
                    <Header />
                    {children}
                    <Footer allBlogs={allBlogs.blogs} />
                </Providers>
            </body>
        </html>
    );
}
