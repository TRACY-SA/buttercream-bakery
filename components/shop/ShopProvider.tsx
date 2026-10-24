"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { business } from "@/lib/business";
import {
  convertUnit,
  isCurrencyCode,
  lineFromUnit,
  roundMoney,
  type CurrencyCode,
} from "@/lib/currency";
import { getProduct, getVariant } from "@/lib/products";
import type { Fulfilment, Product, StoredCartItem, Variant } from "@/lib/types";

const STORAGE_KEY = "buttercream-bakery-shop";
const MAX_QTY = 24;

export type EnrichedLine = {
  lineId: string;
  product: Product;
  variant: Variant;
  quantity: number;
  unit: number;
  total: number;
};

type Toast = { id: string; message: string; tone: "success" | "error" };

type ShopContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  lines: EnrichedLine[];
  cartCount: number;
  subtotal: number;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toasts: Toast[];
  dismissToast: (id: string) => void;
  hydrated: boolean;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function lineId(productId: string, variantId: string) {
  return `${productId}:${variantId}`;
}

export function priceLines(items: StoredCartItem[], currency: CurrencyCode) {
  return items.flatMap((item) => {
    const product = getProduct(item.productId);
    if (!product) return [];
    const variant = product.variants.find((entry) => entry.id === item.variantId);
    if (!variant) return [];
    const quantity = Math.min(MAX_QTY, Math.max(1, item.quantity));
    const unit = convertUnit(variant.priceGhs, currency);
    return [
      {
        lineId: lineId(product.id, variant.id),
        product,
        variant,
        quantity,
        unit,
        total: lineFromUnit(unit, quantity),
      },
    ];
  });
}

export function fulfilmentFee(fulfilment: Fulfilment | "none", currency: CurrencyCode) {
  if (fulfilment !== "delivery") return 0;
  return convertUnit(business.deliveryFeeGhs, currency);
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("GHS");
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const pushToast = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { currency?: string; items?: StoredCartItem[] };
          if (parsed.currency && isCurrencyCode(parsed.currency)) setCurrencyState(parsed.currency);
          if (Array.isArray(parsed.items)) {
            setItems(
              parsed.items.filter(
                (item) =>
                  item &&
                  typeof item.productId === "string" &&
                  typeof item.variantId === "string" &&
                  typeof item.quantity === "number" &&
                  getProduct(item.productId)?.variants.some((variant) => variant.id === item.variantId),
              ),
            );
          }
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currency, items }));
  }, [currency, items, hydrated]);

  const lines = useMemo(() => priceLines(hydrated ? items : [], currency), [items, currency, hydrated]);
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.total, 0));

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
  }, []);

  const addItem = useCallback(
    (productId: string, variantId: string, quantity = 1) => {
      const product = getProduct(productId);
      const variant = product ? getVariant(product, variantId) : undefined;
      if (!product || !variant || !product.isAvailable) {
        pushToast("That treat cannot be added right now.", "error");
        return;
      }
      const amount = Math.min(MAX_QTY, Math.max(1, quantity));
      setItems((current) => {
        const existing = current.find(
          (item) => item.productId === product.id && item.variantId === variant.id,
        );
        if (!existing) {
          return [...current, { productId: product.id, variantId: variant.id, quantity: amount }];
        }
        return current.map((item) =>
          item === existing
            ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + amount) }
            : item,
        );
      });
      pushToast(`${product.name} added to your cart.`);
    },
    [pushToast],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    const [productId, variantId] = id.split(":");
    const next = Math.round(quantity);
    if (next < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: Math.min(MAX_QTY, next) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      const [productId, variantId] = id.split(":");
      const product = getProduct(productId);
      setItems((current) =>
        current.filter((item) => !(item.productId === productId && item.variantId === variantId)),
      );
      pushToast(product ? `${product.name} removed.` : "Item removed.");
    },
    [pushToast],
  );

  const clearCart = useCallback(() => setItems([]), []);
  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      lines,
      cartCount,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      cartOpen,
      setCartOpen,
      toasts,
      dismissToast,
      hydrated,
    }),
    [
      currency,
      setCurrency,
      lines,
      cartCount,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      cartOpen,
      toasts,
      dismissToast,
      hydrated,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
