import { Platform } from "./Platform";
import { Axes } from "./Axes";
import { linear } from "../scale";

// shapes
import { Line } from 'shapes';

// types
import { ViewPortType, PointType, AxisType } from "./typing/types";

// utils
import { extent, now, ts } from "utils";

export class Chart {
  private points: PointType[] = [];
  private visiblePoints: PointType[] = [];
  private axes: Axes;

  // zoom in milliseconds
  private zoom: number = 1000 * 60 * 2;

  private xAxis: AxisType = {
    domain: [0, 0],
    range: [0, 0],
    scale: linear([0, 0], [0, 0]),
  };

  private yAxis: AxisType = {
    domain: [0, 0],
    range: [0, 0],
    scale: linear([0, 0], [0, 0]),
  };

  private viewPort: ViewPortType = {
    width: 390,
    height: 240,
    content: {
      width: 300,
      height: 150,
      margin: {
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      },
    },
    scales: {
      xScale: {
        height: 50,
      },
      yScale: {
        width: 50,
      },
    },
  };

  private lineCollection: Line[] = [];

  constructor(private platform: Platform) {
    this.axes = new Axes(platform);
    this.handleZoom = this.handleZoom.bind(this);
  }

  setSize(width: number, height: number): void {
    this.platform.setSize(width, height);
    this.updateViewPort(width, height);
    if (this.visiblePoints.length !== 0) {
      this.draw();
    }
  }

  setPoints(points: PointType[]): void {
    this.points = points;
    this.updateXAxis();
    this.visiblePoints = points.filter(
      point =>
        point.x <= this.xAxis.domain[1] && point.x > this.xAxis.domain[0],
    );
    this.updateYAxis(this.visiblePoints);
  }

  addPoint(point: PointType): void {
    const lastPoint = this.points[this.points.length - 1];
    if (lastPoint.x !== point.x) {
      this.setPoints([...this.points, point]);
    }
  }

  update(): void {
    this.updateXAxis();
    this.draw();
  }

  handleZoom(): void {

  }

  private draw(): void {
    this.platform.clear();

    // scale points to range
    const scaledPoints = this.visiblePoints.map(point => ({
      y: this.yAxis.scale.invert(point.y),
      x: this.xAxis.scale.scale(point.x),
    }));

    this.platform.lineByPoints(scaledPoints, {
      width: 2,
      color: "rgba(76,117,163 ,1 )",
    });

    // yScale
    this.axes.draw(this.viewPort, this.yAxis.scale, this.xAxis.scale);
  }

  private updateXAxis(): void {
    const nowMilliseconds = now();
    this.xAxis.domain = [nowMilliseconds - this.zoom, nowMilliseconds];
    this.xAxis.range = [
      this.viewPort.content.margin.left,
      this.viewPort.content.width + this.viewPort.content.margin.left,
    ];
    this.xAxis.scale = linear(this.xAxis.domain, this.xAxis.range);
  }

  private updateYAxis(points: PointType[]): void {
    this.yAxis.domain = extent(points, point => point.y);
    this.yAxis.range = [
      this.viewPort.content.margin.top,
      this.viewPort.content.height + this.viewPort.content.margin.top,
    ];
    this.yAxis.scale = linear(this.yAxis.domain, this.yAxis.range);
  }

  private updateViewPort(width: number, height: number): void {
    const { content, scales } = this.viewPort;
    this.viewPort.width = width;
    this.viewPort.height = height;
    this.viewPort.content.width =
      width - scales.yScale.width - content.margin.left - content.margin.right;
    this.viewPort.content.height =
      height -
      scales.xScale.height -
      content.margin.top -
      content.margin.bottom;
  }
}
