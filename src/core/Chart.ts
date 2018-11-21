import { Axes } from "axes";
import { DrawBus } from "drawBus";
import { ViewArea } from "./ViewArea";


// types
import { PointType } from './typing/types';

import { LineType } from "type/LineType";

export class Chart {
  private readonly drawBus: DrawBus;
  private readonly axes: Axes;

  private points: PointType[] = [];
  private visiblePoints: PointType[] = [];
  private viewArea: ViewArea = new ViewArea();
  private type: LineType;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("canvas context not found");
    }
    this.drawBus = new DrawBus(ctx);
    this.axes = new Axes(canvas, this.drawBus, this.viewArea);

    // type
    this.type = new LineType(this.drawBus, this.axes.xAxis, this.axes.yAxis);
  }

  setSize(width: number, height: number): void {
    if (window.devicePixelRatio) {
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.canvas.height = height * window.devicePixelRatio;
      this.canvas.width = width * window.devicePixelRatio;
      const ctx = this.canvas.getContext("2d");
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    }
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
    // scale points to range

    // test
    this.type.setPoints(this.visiblePoints);
    this.type.draw();

    // yScale
    this.axes.draw();
    this.drawBus.commit();
  }

  private updateVisiblePoints(): void {
    this.visiblePoints = this.points.filter(
      point =>
        point.x <= this.axes.xAxis.domain[1] &&
        point.x >= this.axes.xAxis.domain[0],
    );
  }
}
