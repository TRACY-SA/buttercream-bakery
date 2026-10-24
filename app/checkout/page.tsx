import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout for Buttercream Bakery.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-5xl">Checkout</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Choose pickup or delivery, then place your order. The total follows the cart and the currency selected in the header.
      </p>
      <div className="mt-8">
        <CheckoutFlow />
      </div>
    </div>
  );
}
