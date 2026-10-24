"use client";

import { useState } from "react";
import { Price } from "@/components/ui/Price";
import { QuantityControl } from "@/components/cart/CartDrawer";
import { useShop } from "@/components/shop/ShopProvider";
import type { Product } from "@/lib/types";

export function PurchasePanel({ product }: { product: Product }) {
  const { addItem } = useShop();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];

  return (
    <div className="mt-6">
      <p className="text-2xl">
        <Price amountGhs={variant.priceGhs} />
      </p>
      {product.variants.length > 1 ? (
        <label className="mt-4 block text-sm">
          Choose {product.category === "cupcakes" ? "a pack" : "a size"}
          <select
            value={variant.id}
            onChange={(event) => setVariantId(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-3"
          >
            {product.variants.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="mt-2 text-sm text-muted">{variant.label}</p>
      )}
      <div className="mt-4">
        <p className="text-sm">Quantity</p>
        <div className="mt-2">
          <QuantityControl quantity={quantity} onChange={setQuantity} label={product.name} />
        </div>
      </div>
      <button
        type="button"
        disabled={!product.isAvailable}
        onClick={() => addItem(product.id, variant.id, quantity)}
        className="mt-6 h-12 w-full rounded-full bg-rose-deep text-white disabled:bg-line disabled:text-muted sm:w-auto sm:px-8"
      >
        {product.isAvailable ? "Add to cart" : "Unavailable"}
      </button>
    </div>
  );
}
