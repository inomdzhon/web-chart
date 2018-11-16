import { random, ts } from "utils";

type PointType = {
  x: number;
  y: number;
};

export class Point {
  single(ts: number): PointType {
    return {
      x: ts * 1000,
      y: random(-100, 100),
    };
  }

  array(count: number = 100): PointType[] {
    const now = ts();
    const points: PointType[] = [];
    for (let i = now - count; i < now; i += 1) {
      points.push(this.single(i));
    }
    return points;
  }
}
