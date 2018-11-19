export type AxisTypeType = "linear";
export type AxisPositionType = "right" | "bottom";

export type ScaleType = {
  scale: (value: number) => number;
  invert: (value: number) => number;
  range: () => [number, number];
  domain: () => [number, number];
  ticks: (count?: number) => number[];
};

export type OptionsType = {
  label: {
    color: string;
    font: string;
  };
  grid: {
    colorAtZero: string;
    color: string;
  };
};
