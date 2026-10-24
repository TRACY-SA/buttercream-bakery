"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Price } from "@/components/ui/Price";
import { useShop } from "@/components/shop/ShopProvider";
import { CURRENCIES, formatMoney } from "@/lib/currency";

export function QuantityControl({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex h-10 items-center rounded-full border border-line bg-white">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center disabled:opacity-40"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label={`Reduce ${label}`}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-6 text-center text-sm" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center disabled:opacity-40"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= 24}
        aria-label={`Add ${label}`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQuantity, removeItem, subtotal, currency, hydrated } = useShop();
  if (!hydrated) {
    return <p className="text-sm text-muted">Loading your basket…</p>;
  }
  if (lines.length === 0) {
    return (
      <div className="rounded-[1.5rem] bg-cream px-6 py-12 text-center">
        <p className="font-script text-3xl text-rose">The basket is empty</p>
        <p className="mt-2 text-sm text-muted">Cakes, bread, and the recipe book can all sit together here.</p>
        <Link href="/products" onClick={onNavigate} className="mt-6 inline-flex h-11 items-center rounded-full bg-rose-deep px-5 text-sm text-white">
          Browse the treats
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-line">
        {lines.map((line) => (
          <li key={line.lineId} className="flex gap-3 py-4">
            <Link href={`/products/${line.product.slug}`} onClick={onNavigate} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-deep">
              <Image src={line.product.image} alt={line.product.imageAlt} fill className="object-cover" sizes="80px" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium leading-5">{line.product.name}</p>
                  <p className="text-sm text-muted">{line.variant.label}</p>
                  <p className="text-sm text-muted">
                    <Price amountGhs={line.variant.priceGhs} /> each
                  </p>
                </div>
                <button type="button" className="text-sm text-rose-deep underline" onClick={() => removeItem(line.lineId)}>
                  Remove
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <QuantityControl
                  quantity={line.quantity}
                  label={line.product.name}
                  onChange={(quantity) => setQuantity(line.lineId, quantity)}
                />
                <p className="font-medium">{formatMoney(line.total, currency)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span>Subtotal</span>
        <span className="font-serif text-2xl">{formatMoney(subtotal, currency)}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">
        Shown in {CURRENCIES.find((item) => item.code === currency)?.name}. Delivery is added at checkout.
      </p>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines } = useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button className="absolute inset-0 bg-ink/40" aria-label="Close cart" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 flex h-full w-[min(100%,28rem)] flex-col bg-white p-5 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 id="cart-title" className="font-serif text-3xl">
            Your cart
          </h2>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-cream" onClick={() => setCartOpen(false)}>
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close cart</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <CartLines onNavigate={() => setCartOpen(false)} />
        </div>
        {lines.length > 0 ? (
          <div className="mt-4 grid gap-2">
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-rose-deep text-white"
            >
              Checkout
            </Link>
            <Link href="/cart" onClick={() => setCartOpen(false)} className="inline-flex h-11 items-center justify-center text-sm underline">
              Review the full cart
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ToastRegion() {
  const { toasts, dismissToast } = useShop();
  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[60] flex w-[min(100%-2rem,22rem)] flex-col gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className={`pointer-events-auto rounded-2xl px-4 py-3 text-left text-sm shadow-lg ${
            toast.tone === "error" ? "bg-rose-deep text-white" : "bg-ink text-white"
          }`}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
