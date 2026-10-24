"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { business } from "@/lib/business";
import { formatMoney } from "@/lib/currency";
import { makeReference } from "@/lib/forms";
import { collectErrors, emailError, phoneError, required } from "@/lib/validation";
import type { DemoOrder, Fulfilment, PaymentMethod } from "@/lib/types";
import { fulfilmentFee, useShop } from "@/components/shop/ShopProvider";
import { QuantityControl } from "@/components/cart/CartDrawer";

const ORDER_KEY = "buttercream-demo-order";

const payments: { id: PaymentMethod; title: string }[] = [
  { id: "mobile-money", title: "Mobile money" },
  { id: "card", title: "Card payment" },
  { id: "pay-on-collection", title: "Pay on collection" },
];

export function CheckoutFlow() {
  const router = useRouter();
  const { lines, currency, setQuantity, removeItem, clearCart, subtotal, hydrated } = useShop();
  const [fulfilment, setFulfilment] = useState<Fulfilment>("pickup");
  const [payment, setPayment] = useState<PaymentMethod>("mobile-money");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const delivery = fulfilmentFee(fulfilment, currency);
  const total = Math.round((subtotal + delivery) * 100) / 100;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (lines.length === 0) {
      setErrors({ form: "Add something to the cart before checkout." });
      return;
    }
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries()) as Record<string, string>;
    const next = collectErrors([
      ["name", required(values.name ?? "", "Name")],
      ["email", emailError(values.email ?? "")],
      ["phone", phoneError(values.phone ?? "")],
      ["address", fulfilment === "delivery" ? required(values.address ?? "", "Street address") : null],
      ["area", fulfilment === "delivery" ? required(values.area ?? "", "Area") : null],
    ]);
    setErrors(next);
    if (Object.keys(next).length) return;

    setPending(true);
    const order: DemoOrder = {
      reference: makeReference("D"),
      createdAt: new Date().toISOString(),
      currency,
      fulfilment,
      paymentMethod: payment,
      customer: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: fulfilment === "delivery" ? values.address : "",
        area: fulfilment === "delivery" ? values.area : "",
        notes: values.notes ?? "",
      },
      lines: lines.map((line) => ({
        name: line.product.name,
        variant: line.variant.label,
        quantity: line.quantity,
        unitLabel: formatMoney(line.unit, currency),
        lineLabel: formatMoney(line.total, currency),
        image: line.product.image,
        imageAlt: line.product.imageAlt,
      })),
      subtotalLabel: formatMoney(subtotal, currency),
      deliveryLabel: formatMoney(delivery, currency),
      totalLabel: formatMoney(total, currency),
      demo: true,
    };
    window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    setLeaving(true);
    clearCart();
    router.push("/checkout/success");
  }

  if (!hydrated || leaving) {
    return <p className="text-muted">{leaving ? "Placing your order…" : "Loading your order…"}</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-[1.6rem] bg-white px-6 py-16 text-center">
        <h1 className="font-serif text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-muted">Checkout opens once there is something to order.</p>
        <Link href="/products" className="mt-6 inline-flex h-12 items-center rounded-full bg-rose-deep px-6 text-white">
          Browse treats
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <fieldset className="rounded-[1.6rem] bg-white p-5 sm:p-6">
          <legend className="font-serif text-2xl">Collection</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["pickup", "Pickup", `Collect from ${business.location}.`],
                ["delivery", "Delivery", `Adds ${formatMoney(fulfilmentFee("delivery", currency), currency)}.`],
              ] as const
            ).map(([id, title, copy]) => (
              <label key={id} className={`cursor-pointer rounded-2xl border p-4 ${fulfilment === id ? "border-rose-deep bg-blush" : "border-line bg-white"}`}>
                <input
                  type="radio"
                  name="fulfilment"
                  value={id}
                  checked={fulfilment === id}
                  onChange={() => setFulfilment(id)}
                  className="mr-2"
                />
                <span className="font-medium">{title}</span>
                <span className="mt-1 block text-sm text-muted">{copy}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="rounded-[1.6rem] bg-white p-5 sm:p-6">
          <h2 className="font-serif text-2xl">Your details</h2>
          <div className="mt-4 grid gap-4">
            <label className="text-sm">
              Name
              <input name="name" autoComplete="name" className="mt-1 h-12 w-full rounded-2xl border border-line px-4" aria-invalid={Boolean(errors.name)} />
              {errors.name ? <span className="mt-1 block text-rose-deep">{errors.name}</span> : null}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                Email address
                <input name="email" type="email" autoComplete="email" className="mt-1 h-12 w-full rounded-2xl border border-line px-4" aria-invalid={Boolean(errors.email)} />
                {errors.email ? <span className="mt-1 block text-rose-deep">{errors.email}</span> : null}
              </label>
              <label className="text-sm">
                Telephone
                <input name="phone" type="tel" autoComplete="tel" className="mt-1 h-12 w-full rounded-2xl border border-line px-4" aria-invalid={Boolean(errors.phone)} />
                {errors.phone ? <span className="mt-1 block text-rose-deep">{errors.phone}</span> : null}
              </label>
            </div>
            {fulfilment === "delivery" ? (
              <div className="grid gap-4">
                <label className="text-sm">
                  Delivery address
                  <input name="address" autoComplete="street-address" className="mt-1 h-12 w-full rounded-2xl border border-line px-4" aria-invalid={Boolean(errors.address)} />
                  {errors.address ? <span className="mt-1 block text-rose-deep">{errors.address}</span> : null}
                </label>
                <label className="text-sm">
                  Area or neighbourhood
                  <input name="area" className="mt-1 h-12 w-full rounded-2xl border border-line px-4" aria-invalid={Boolean(errors.area)} />
                  {errors.area ? <span className="mt-1 block text-rose-deep">{errors.area}</span> : null}
                </label>
              </div>
            ) : null}
            <label className="text-sm">
              Order notes
              <textarea name="notes" rows={3} className="mt-1 w-full rounded-2xl border border-line px-4 py-3" placeholder="A short message for the box, if you want one" />
            </label>
          </div>
        </div>

        <fieldset className="rounded-[1.6rem] bg-white p-5 sm:p-6">
          <legend className="font-serif text-2xl">Payments</legend>
          <div className="mt-4 grid gap-3">
            {payments.map((method) => (
              <label key={method.id} className={`block cursor-pointer rounded-2xl border p-4 ${payment === method.id ? "border-rose-deep bg-blush" : "border-line bg-white"}`}>
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={payment === method.id}
                  onChange={() => setPayment(method.id)}
                  className="mr-2"
                />
                <span className="font-medium">{method.title}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="h-fit rounded-[1.6rem] bg-white p-5 sm:p-6 lg:sticky lg:top-24">
        <h2 className="font-serif text-2xl">Order summary</h2>
        <ul className="mt-4 divide-y divide-line">
          {lines.map((line) => (
            <li key={line.lineId} className="flex gap-3 py-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
                {line.product.slug === "buttercream-recipe-book" ? null : (
                  <Image src={line.product.image} alt="" fill className="object-cover" sizes="64px" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-5">{line.product.name}</p>
                <p className="text-sm text-muted">{line.variant.label}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <QuantityControl quantity={line.quantity} label={line.product.name} onChange={(quantity) => setQuantity(line.lineId, quantity)} />
                  <button type="button" className="text-xs text-rose-deep underline" onClick={() => removeItem(line.lineId)}>
                    Remove
                  </button>
                </div>
                <p className="mt-1 text-sm">{formatMoney(line.total, currency)}</p>
              </div>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatMoney(subtotal, currency)}</dd>
          </div>
          {fulfilment === "delivery" ? (
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd>{formatMoney(delivery, currency)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl">
            <dt>Total</dt>
            <dd>{formatMoney(total, currency)}</dd>
          </div>
        </dl>
        {errors.form ? (
          <p role="alert" className="mt-3 text-sm text-rose-deep">
            {errors.form}
          </p>
        ) : null}
        <button type="submit" disabled={pending || lines.length === 0} className="mt-5 h-12 w-full rounded-full bg-rose-deep text-white disabled:opacity-60">
          {pending ? "Placing order…" : "Place order"}
        </button>
      </aside>
    </form>
  );
}

export function OrderSuccess() {
  const [order, setOrder] = useState<DemoOrder | null | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.sessionStorage.getItem(ORDER_KEY);
        setOrder(raw ? (JSON.parse(raw) as DemoOrder) : null);
      } catch {
        setOrder(null);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (order === undefined) {
    return <p className="text-muted">Loading your order…</p>;
  }

  if (!order) {
    return (
      <div className="rounded-[1.6rem] bg-white px-6 py-16 text-center">
        <h1 className="font-serif text-4xl">No order is waiting</h1>
        <p className="mt-3 text-muted">Place an order from checkout to see the confirmation.</p>
        <Link href="/products" className="mt-6 inline-flex h-12 items-center rounded-full bg-rose-deep px-6 text-white">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[1.8rem] bg-white p-6 sm:p-10">
      <p className="text-xs uppercase tracking-[0.2em] text-rose">Order received</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Your order is noted</h1>
      <p className="mt-3 leading-7 text-muted">
        Reference <strong className="text-ink">{order.reference}</strong>.
      </p>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Name</dt>
          <dd>{order.customer.name}</dd>
        </div>
        <div>
          <dt className="text-muted">Fulfilment</dt>
          <dd>{order.fulfilment === "delivery" ? `Delivery to ${order.customer.address}, ${order.customer.area}` : `Pickup from ${business.location}`}</dd>
        </div>
        <div>
          <dt className="text-muted">Payment choice</dt>
          <dd>{payments.find((method) => method.id === order.paymentMethod)?.title}</dd>
        </div>
        <div>
          <dt className="text-muted">Total shown</dt>
          <dd>{order.totalLabel}</dd>
        </div>
      </dl>
      <ul className="mt-6 divide-y divide-line">
        {order.lines.map((line) => (
          <li key={`${line.name}-${line.variant}`} className="flex justify-between gap-4 py-3 text-sm">
            <span>
              {line.name}
              <span className="block text-muted">
                {line.variant} · {line.quantity}
              </span>
            </span>
            <span>{line.lineLabel}</span>
          </li>
        ))}
      </ul>
      <Link href="/products" className="mt-8 inline-flex h-12 items-center rounded-full bg-rose-deep px-6 text-white">
        Continue shopping
      </Link>
    </div>
  );
}
