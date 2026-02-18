export function formatMoney(amountCents: number, currency: string) {
  const safeAmount = Number.isFinite(amountCents) ? amountCents : 0;
  const safeCurrency = currency?.toUpperCase?.() || "USD";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: safeCurrency,
    maximumFractionDigits: 2
  }).format(safeAmount / 100);
}

