export function formatMoney(amountCents: number, currency: string) {
  const safeAmount = Number.isFinite(amountCents) ? amountCents : 0;
  const safeCurrency = currency?.toUpperCase?.() || "USD";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: safeCurrency,
    maximumFractionDigits: 2
  }).format(safeAmount / 100);
}

export function formatNpr(amountRupees: number) {
  const safeAmount = Number.isFinite(amountRupees) ? amountRupees : 0;
  const formatted = new Intl.NumberFormat("en-NP", { maximumFractionDigits: 0 }).format(safeAmount);
  return `Rs. ${formatted}`;
}
