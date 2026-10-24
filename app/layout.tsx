import type { Metadata } from "next";
import { Fraunces, Great_Vibes, Outfit } from "next/font/google";
import { AnnouncementBar, SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { CartDrawer, ToastRegion } from "@/components/cart/CartDrawer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ShopProvider } from "@/components/shop/ShopProvider";
import { business } from "@/lib/business";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes" });

export const metadata: Metadata = {
  title: {
    default: "Buttercream Bakery | Smells Like Home, Tastes Like a Celebration",
    template: "%s | Buttercream Bakery",
  },
  description:
    "Buttercream Bakery in Dome Pillar 2, Accra. Cakes, cupcakes, bread, pastries, bento cakes, and sheet cakes since 2018.",
  openGraph: {
    title: "Buttercream Bakery",
    description: business.tagline,
    locale: "en_GH",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: business.name,
  telephone: business.telephoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.streetAddress,
    addressLocality: "Accra",
    addressRegion: "Greater Accra",
    addressCountry: "GH",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} ${script.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ShopProvider>
          <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
            Skip to content
          </a>
          <AnnouncementBar />
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
          <ToastRegion />
          <ChatWidget />
        </ShopProvider>
      </body>
    </html>
  );
}
