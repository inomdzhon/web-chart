export type PointType = {
  x: number;
  y: number;
};

export type LineOptionsType = {
  width: number;
  color: string;
  dash?: number[];
  cap?: "butt" | "round" | "square";
};
