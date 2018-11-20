/**
 * Округляем float
 * @param x число для округления
 * @param base основание 10 в степени
 */

export function roundFloat(x: number, base: number): number {
  return Math.round(x * base) / base;
}
