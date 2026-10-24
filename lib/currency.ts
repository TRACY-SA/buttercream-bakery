/**
 * Demonstration exchange rates.
 * Base prices stay in GHS. These multipliers are samples for the coursework
 * shop and are not live market rates. Update them before any real-world use.
 *
 * Rounding: each unit price is converted from GHS and rounded to 2 decimals.
 * A line total is that rounded unit price multiplied by quantity, then rounded
 * to 2 decimals. The subtotal is the sum of line totals, so the basket matches
 * the figures on screen. The stored catalogue price is never changed.
 */
export const CURRENCIES = [
  { code: "GHS", label: "GHS", name: "Ghanaian cedi", symbol: "GH₵" },
  { code: "USD", label: "USD", name: "US dollar", symbol: "US$" },
  { code: "GBP", label: "GBP", name: "British pound", symbol: "£" },
  { code: "EUR", label: "EUR", name: "Euro", symbol: "€" },
  { code: "NGN", label: "NGN", name: "Nigerian naira", symbol: "₦" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEMO_RATES: Record<CurrencyCode, number> = {
  GHS: 1,
  USD: 0.067,
  GBP: 0.052,
  EUR: 0.061,
  NGN: 102,
};

export function isCurrencyCode(value: string): value is CurrencyCode {
  return CURRENCIES.some((currency) => currency.code === value);
}

export function rateFor(currency: CurrencyCode): number {
  const rate = DEMO_RATES[currency];
  return typeof rate === "number" && rate > 0 ? rate : 1;
}

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function convertUnit(amountGhs: number, currency: CurrencyCode): number {
  return roundMoney(amountGhs * rateFor(currency));
}

export function lineFromUnit(unit: number, quantity: number): number {
  return roundMoney(unit * quantity);
}

export function formatMoney(amount: number, currency: CurrencyCode): string {
  const currencyMeta = CURRENCIES.find((item) => item.code === currency) ?? CURRENCIES[0];
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundMoney(amount));
  return `${currencyMeta.symbol} ${formatted}`;
}

export function formatFromGhs(amountGhs: number, currency: CurrencyCode, quantity = 1): string {
  const unit = convertUnit(amountGhs, currency);
  return formatMoney(lineFromUnit(unit, quantity), currency);
}
