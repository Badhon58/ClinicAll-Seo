import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import StoreProvider from "./StoreProvider";
import SocketProvider from "@/providers/SocketProvider";
import CallNotification from "@/components/common/CallNotification";
import ConcentWraper from "@/components/common/ConcentWraper";
import { schemaData } from "./_document";
import Head from "next/head";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
// import { hasLocale, NextIntlClientProvider } from "next-intl";
// import { routing } from "@/i18n/routing";
import NotFound from "./not-found";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

const clashDisplayen = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CliniCall - Best Online Doctor Consultation in BD",
  description:
    "CliniCall – The leading telemedicine platform in BD. Get expert online doctor consultations anytime, anywhere. trusted & secure healthcare.",
  metadataBase: new URL("https://theclinicall.com"),
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: // params,
Readonly<{
  children: React.ReactNode;
  // params: Promise<{ locale: string }>;
}>) {
  // const { locale } = await params;
  // if (!hasLocale(routing.locales, locale)) {
  //   NotFound();
  // }
  // const messages = (await import(`@/messages/${locale}.json`)).default;
  return (
    <html lang="en">
      <Head>
        <link
          rel="canonical"
          href="https://theclinicall.com/en"
          hrefLang="en"
        ></link>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <body
        suppressHydrationWarning={true}
        className={`${clashDisplayen.variable} antialiased relative`}
      >
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <GoogleAnalytics />
        <ConcentWraper />
        <SocketProvider>
          <StoreProvider>
            {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
            {children}
            {/* </NextIntlClientProvider> */}
           
          </StoreProvider>

          <CallNotification />
        </SocketProvider>
      </body>
    </html>
  );
}
