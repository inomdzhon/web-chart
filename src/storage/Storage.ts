import { RawPointType, PointType } from "./typing/types";

import { Axis } from "axes";

export class Storage {
  points: PointType[] = [];
  visiblePoints: PointType[] = [];

  constructor(private xAxis: Axis, private yAxis: Axis) {}

  setPoints(points: RawPointType[]): void {
    this.points = points.map(this.prepare);
  }

  addPoint(point: RawPointType): void {
    const lastPoint = this.points[this.points.length - 1];
    if (lastPoint.values.x !== point.x) {
      this.points.push(this.prepare(point));
    }
  }

  private prepare(point: RawPointType): PointType {
    return {
      values: {
        x: point.x,
        y: point.y,
      },
      coordinates: {
        x: this.xAxis.scale.scale(point.x),
        y: this.yAxis.scale.invert(point.x),
      },
    };
  }
}
