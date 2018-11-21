export type PointType = {
  x: number;
  y: number;
};

export type LineAttributesType = {
  id: number;
  from: PointType;
  to: PointType;
};

export type LineOptionsType = {
  width: number;
  color: string;
  cap?: "butt" | "round" | "square";
  dash?: number[];
};
