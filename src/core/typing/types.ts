import { ScaleType } from "scale";

export type ViewPortType = {
  width: number;
  height: number;
  content: {
    width: number;
    height: number;
    margin: {
      top: number;
      left: number;
      bottom: number;
      right: number;
    };
  };
  scales: {
    xScale: {
      height: number;
    };
    yScale: {
      width: number;
    };
  };
};

export type PointType = {
  x: number;
  y: number;
};

export type AxisType = {
  domain: [number, number];
  range: [number, number];
  scale: ScaleType;
};

export type LineOptionsType = {
  width: number;
  color: string;
  dash?: number[];
  cap?: "butt" | "round" | "square";
};
