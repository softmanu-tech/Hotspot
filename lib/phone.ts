/** Accepts 07XXXXXXXX, 01XXXXXXXX, 2547XXXXXXXX or +2547XXXXXXXX; returns 254XXXXXXXXX or null. */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/[\s()+-]/g, "");
  const match = digits.match(/^(?:254|0)([17]\d{8})$/);
  return match ? `254${match[1]}` : null;
}
