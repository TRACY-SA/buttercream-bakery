"use client";

import { useShop } from "@/components/shop/ShopProvider";
import { convertUnit, formatMoney, lineFromUnit } from "@/lib/currency";

export function Price({
  amountGhs,
  quantity = 1,
  className = "",
}: {
  amountGhs: number;
  quantity?: number;
  className?: string;
}) {
  const { currency } = useShop();
  const amount = lineFromUnit(convertUnit(amountGhs, currency), quantity);
  return <span className={className}>{formatMoney(amount, currency)}</span>;
}
