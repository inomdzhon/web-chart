import { now } from "utils";

type PointType = {
  x: number;
  y: number;
};

export class Point {
  single(tsMs: number): PointType {
    return {
      x: tsMs,
      y: Math.random(),
    };
  }

  array(count: number = 100): PointType[] {
    const nowMs = now();
    const points: PointType[] = [];
    for (let i = nowMs - count * 1000; i < nowMs; i += 500) {
      points.push(this.single(i));
    }
    return points;
  }
}
