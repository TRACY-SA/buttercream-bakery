import type { Metadata } from "next";
import { OrderSuccess } from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Order received",
  description: "Order confirmation for Buttercream Bakery.",
};

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <OrderSuccess />
    </div>
  );
}
