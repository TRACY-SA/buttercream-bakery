import type { Metadata } from "next";
import Link from "next/link";
import { CartLines } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the Buttercream Bakery treats in your cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-5xl">Your cart</h1>
      <p className="mt-3 text-muted">Change a quantity, remove a line, or continue to checkout.</p>
      <div className="mt-8 rounded-[1.6rem] bg-white p-5 sm:p-6">
        <CartLines />
        <Link href="/checkout" className="mt-6 inline-flex h-12 items-center rounded-full bg-rose-deep px-6 text-white">
          Continue to checkout
        </Link>
      </div>
    </div>
  );
}
