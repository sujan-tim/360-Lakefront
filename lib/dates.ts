export function dateStringToUtcNoon(dateString: string) {
  const [year, month, day] = dateString.split("-").map((value) => Number(value));
  if (!year || !month || !day) return null;
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return Number.isNaN(date.getTime()) ? null : date;
}

