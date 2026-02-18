export const USD_TO_NPR_RATE = 145;

export function usdCentsToNprRupees(usdCents: number, rate = USD_TO_NPR_RATE) {
  const safeUsdCents = Number.isFinite(usdCents) ? usdCents : 0;
  const safeRate = Number.isFinite(rate) ? rate : USD_TO_NPR_RATE;
  return Math.round((safeUsdCents * safeRate) / 100);
}

// Discount model (percentage-based):
// - 11 USD -> 1595 NPR (at 145) -> discounted to 1500 NPR
// Use the same exact ratio for all totals so:
// - 22 USD -> 3190 NPR -> 3000 NPR
// - 33 USD -> 4785 NPR -> 4500 NPR
const DISCOUNT_EXAMPLE_BASE_NPR = 1595;
const DISCOUNT_EXAMPLE_DISCOUNTED_NPR = 1500;

export function applyNprPercentageDiscount(nprRupees: number) {
  const safe = Number.isFinite(nprRupees) ? nprRupees : 0;
  const discounted = Math.round((safe * DISCOUNT_EXAMPLE_DISCOUNTED_NPR) / DISCOUNT_EXAMPLE_BASE_NPR);
  return {
    base: safe,
    discounted,
    discount: safe - discounted
  };
}
