export function pad2(value: number): string {
  return (value < 10 ? "0" : "") + value;
}
