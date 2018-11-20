// types
import { PointType } from "./typing/types";

export class Storage {
  points: PointType[] = [];
  lastPoint?: PointType;

  setPoints(points: PointType[]): void {
    this.points = points;
    if (points.length) {
      this.lastPoint = points[points.length - 1];
    }
  }

  addPoint(point: PointType): void {
    this.points.push(point);
    if (!this.lastPoint || point.x >= this.lastPoint.x) {
      this.lastPoint = point;
    }
  }
}
