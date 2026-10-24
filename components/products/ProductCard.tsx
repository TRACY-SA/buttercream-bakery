"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RecipeCover } from "@/components/brand/RecipeCover";
import { Price } from "@/components/ui/Price";
import { useShop } from "@/components/shop/ShopProvider";
import { minPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useShop();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quick, setQuick] = useState(false);
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  const from = product.variants.length > 1;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-line bg-white shadow-[0_10px_30px_rgba(63,42,46,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(63,42,46,0.08)]">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-cream-deep">
        {product.slug === "buttercream-recipe-book" ? (
          <RecipeCover />
        ) : (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1280px) 23vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.bestseller ? (
            <span className="rounded-full bg-butter px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-ink">
              Bestseller
            </span>
          ) : null}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-rose">
          {product.subcategory === "bento"
            ? "Bento cake"
            : product.subcategory === "sheet"
              ? "Sheet cake"
              : product.category === "recipe-book"
                ? "Recipe book"
                : product.category}
        </p>
        <h3 className="mt-1 font-serif text-xl leading-tight">
          <Link href={`/products/${product.slug}`} className="hover:text-rose-deep">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
        <p className="mt-3 font-medium">
          {from ? <span className="mr-1 text-sm text-muted">From</span> : null}
          <Price amountGhs={from ? minPrice(product) : variant.priceGhs} />
        </p>
        {product.variants.length > 1 ? (
          <label className="mt-3 block text-xs text-muted">
            {product.category === "cupcakes" ? "Pack" : "Option"}
            <select
              value={variant.id}
              onChange={(event) => setVariantId(event.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-line bg-cream px-2 text-sm text-ink"
            >
              {product.variants.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            disabled={!product.isAvailable}
            onClick={() => addItem(product.id, variant.id, 1)}
            className="h-11 flex-1 rounded-full bg-rose-deep text-sm text-white disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
          >
            {product.isAvailable ? "Add to cart" : "Unavailable"}
          </button>
          <button
            type="button"
            onClick={() => setQuick(true)}
            className="h-11 rounded-full border border-line px-3 text-sm hover:bg-cream"
          >
            Quick view
          </button>
        </div>
      </div>
      {quick ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby={`quick-${product.id}`}>
          <button className="absolute inset-0 bg-ink/45" aria-label="Close quick view" onClick={() => setQuick(false)} />
          <div className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[1.6rem] bg-cream md:grid-cols-2">
            <div className="relative min-h-64">
              {product.slug === "buttercream-recipe-book" ? (
                <RecipeCover />
              ) : (
                <Image src={product.image} alt={product.imageAlt} fill className="object-cover" sizes="400px" />
              )}
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-rose">{product.category}</p>
              <h2 id={`quick-${product.id}`} className="mt-1 font-serif text-3xl">
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{product.details}</p>
              <p className="mt-4 text-lg">
                <Price amountGhs={variant.priceGhs} />
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="h-11 rounded-full bg-rose-deep px-5 text-sm text-white"
                  onClick={() => {
                    addItem(product.id, variant.id, 1);
                    setQuick(false);
                  }}
                >
                  Add to cart
                </button>
                <Link href={`/products/${product.slug}`} className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm">
                  Full details
                </Link>
                <button type="button" className="h-11 px-3 text-sm" onClick={() => setQuick(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
