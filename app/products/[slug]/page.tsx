import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RecipeCover } from "@/components/brand/RecipeCover";
import { ProductCard } from "@/components/products/ProductCard";
import { PurchasePanel } from "@/components/products/PurchasePanel";
import { getProduct, products, relatedProducts } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage(props: Props) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-muted">Loading this bake…</div>}>
      <ProductDetails {...props} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm text-muted">
        <Link href="/products" className="underline">
          Our Products
        </Link>
        <span aria-hidden="true"> / </span>
        {product.name}
      </p>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-deep">
          {product.slug === "buttercream-recipe-book" ? (
            <RecipeCover />
          ) : (
            <Image src={product.image} alt={product.imageAlt} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-rose">
            {product.subcategory === "bento" ? "Bento cake" : product.subcategory === "sheet" ? "Sheet cake" : product.category.replace("-", " ")}
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{product.details}</p>
          <p className="mt-3 text-sm">{product.isAvailable ? "Available." : "Currently unavailable."}</p>
          {product.bestseller ? <p className="mt-2 text-sm text-gold">Bestseller.</p> : null}
          <PurchasePanel product={product} />
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-3xl">More from this shelf</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
