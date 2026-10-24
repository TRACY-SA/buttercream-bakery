"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Price } from "@/components/ui/Price";
import { useShop } from "@/components/shop/ShopProvider";
import { products } from "@/lib/products";

const reel = products.filter((product) =>
  [
    "classic-vanilla-celebration-cake",
    "rich-chocolate-fudge-cake",
    "strawberry-shortcake",
    "bento-birthday-cake",
    "celebration-sheet-cake",
    "salted-caramel-cupcake",
    "butter-croissant",
    "cinnamon-roll",
  ].includes(product.slug),
);

export function FlavourReel() {
  const { addItem } = useShop();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = reel[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reel.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  if (!active) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="reel-title">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-rose">Slide through the counter</p>
          <h2 id="reel-title" className="mt-2 font-serif text-4xl sm:text-5xl">
            One glance. A different bake.
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            The picture moves through a few favourites. Tap a name, or let it keep turning.
          </p>
        </div>
        <Link href="/products" className="text-sm underline decoration-rose underline-offset-4">
          See the full menu
        </Link>
      </div>
      <div
        className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(63,42,46,0.06)] lg:grid-cols-[1.1fr_0.9fr]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative min-h-[22rem] bg-cream-deep">
          <Image
            key={active.slug}
            src={active.image}
            alt={active.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-rose">{active.category}</p>
          <h3 className="mt-2 font-serif text-4xl leading-tight">{active.name}</h3>
          <p className="mt-3 text-muted">{active.description}</p>
          <p className="mt-4 text-lg">
            From <Price amountGhs={Math.min(...active.variants.map((variant) => variant.priceGhs))} />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="h-11 rounded-full bg-rose-deep px-5 text-sm text-white"
              onClick={() => addItem(active.id, active.variants[0].id, 1)}
            >
              Add to cart
            </button>
            <Link href={`/products/${active.slug}`} className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm">
              View bake
            </Link>
          </div>
          <div className="mt-8 flex gap-2 overflow-auto" role="tablist" aria-label="Featured bakes">
            {reel.map((product, productIndex) => (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={productIndex === index}
                onClick={() => setIndex(productIndex)}
                className={`h-2.5 rounded-full transition-all ${productIndex === index ? "w-8 bg-rose-deep" : "w-2.5 bg-blush-deep"}`}
              >
                <span className="sr-only">{product.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
