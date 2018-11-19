import { random, ts } from "utils";

type PointType = {
  x: number;
  y: number;
};

export class Point {
  single(ts: number): PointType {
    const generateDomain = [-3, 3];
    if (ts % 8) {
      generateDomain[0] = -1;
    } else if (ts % 6) {
      generateDomain[0] = -3;
    } else if (ts % 4) {
      generateDomain[0] = -4;
    } else if (ts % 2) {
      generateDomain[0] = -2;
    }

    if (ts % 3) {
      generateDomain[1] = 2;
    } else if (ts % 5) {
      generateDomain[1] = 5;
    } else if (ts % 7) {
      generateDomain[1] = 3;
    } else if (ts % 9) {
      generateDomain[1] = 1;
    }

    return {
      x: ts * 1000,
      y: random(generateDomain[0], generateDomain[1]),
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
