export type PointType = {
  x: number;
  y: number;
};

export type LineShapeAttributesType = {
  id: number;
  from: PointType;
  to: PointType;
};

export type LineShapeOptionsType = {
  width: number;
  color: string;
  cap?: "butt" | "round" | "square";
  dash?: number[];
};
