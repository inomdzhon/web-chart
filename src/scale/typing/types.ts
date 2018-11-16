export type ScaleType = {
  scale: (value: number) => number;
  invert: (value: number) => number;
  range: () => [number, number];
  domain: () => [number, number];
  ticks: (count?: number) => number[];
};
