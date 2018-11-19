import { Platform, PointType } from "platform";
import { ViewArea } from "./ViewArea";

// core
import { Axes } from "axes";

import { LineType } from "type/LineType";

export class Chart {
  private readonly platform: Platform;
  private readonly axes: Axes;

  private points: PointType[] = [];
  private visiblePoints: PointType[] = [];
  private viewArea: ViewArea = new ViewArea();
  private type: LineType;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("canvas context not found");
    }
    this.platform = new Platform(ctx);
    this.axes = new Axes(canvas, this.platform, this.viewArea);
    // type
    this.type = new LineType(ctx);
  }

  setSize(width: number, height: number): void {
    this.platform.setSize(width, height);
    this.viewArea.update(width, height);
    if (this.visiblePoints.length !== 0) {
      this.draw();
    }
  }

  setPoints(points: PointType[]): void {
    this.points = points;
  }

  addPoint(point: PointType): void {
    const lastPoint = this.points[this.points.length - 1];
    if (lastPoint.x !== point.x) {
      this.points.push(point);
    }
  }

  update(): void {
    this.updateVisiblePoints();
    this.axes.updateAxis(this.visiblePoints);
    this.draw();
  }

  private draw(): void {
    this.platform.clear();

    // scale points to range
    const scaledPoints = this.visiblePoints.map(point => ({
      y: this.axes.yAxis.scale.invert(point.y),
      x: this.axes.xAxis.scale.scale(point.x),
    }));

    // test
    this.type.setPoints(scaledPoints);

    // yScale
    this.axes.draw();
  }

  private updateVisiblePoints(): void {
    this.visiblePoints = this.points.filter(
      point =>
        point.x <= this.axes.xAxis.domain[1] &&
        point.x >= this.axes.xAxis.domain[0],
    );
  }
}
