
/**
 * If string is numeric - return the number, otherwise return the string.
 */
export function toNumberIfNumeric(value: string): number | string {
  const trimmed = value.trim();

  if (trimmed === '') return value;
  const num = Number(trimmed);

  return Number.isFinite(num) ? num : value;
}
