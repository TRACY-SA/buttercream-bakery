import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { primaryProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Browse Buttercream Bakery cakes, cupcakes, bread, pastries, bento cakes, and sheet cakes.",
};

export default function ProductsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <Image
          src="/images/brand/hero.jpg"
          alt="Celebration cake on a linen table"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-white sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-butter">The counter</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl sm:text-6xl">Our products</h1>
          <p className="mt-4 max-w-xl text-lg leading-7 text-white/85">
            {primaryProducts.length} treats across cakes, cupcakes, bread, and pastries, including bento cakes and a celebration sheet cake.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<p className="text-muted">Loading the counter…</p>}>
          <ProductBrowser />
        </Suspense>
      </div>
    </div>
  );
}
