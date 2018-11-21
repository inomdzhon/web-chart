import { DrawBus } from "drawBus";

// types
import { PointType } from "core";
import { LineAttributesType } from "./typing/types";

import { Axis } from "axes/axis";

// Persis Chart
import { PersistType } from "../PersistType";

// interpolator
import { Interpolator } from "./Interpolator";

function drawLine(drawBus: DrawBus, from: PointType, to: PointType): void {
  drawBus.add({
    type: "line",
    position: {
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
    },
    style: {
      color: "rgba(76,117,163 ,1 )",
      width: 2,
    },
  });
}

export class LineType {
  private lines: LineAttributesType[] = [];
  private interpolator: Interpolator = new Interpolator();

  constructor(
    protected drawBus: DrawBus,
    protected xAxis: Axis,
    protected yAxis: Axis,
  ) {}

  setPoints(points: PointType[]): void {
    this.lines = this.prepare(points);
  }

  private prepare(points: PointType[]): LineAttributesType[] {
    const result: LineAttributesType[] = [];
    let from: PointType;
    let to: PointType;
    for (let i = 0; i < points.length; i += 1) {
      if (!points[i + 1]) {
        continue;
      }
      from = {
        y: this.yAxis.scale.invert(points[i].y),
        x: this.xAxis.scale.scale(points[i].x),
      };
      to = {
        y: this.yAxis.scale.invert(points[i + 1].y),
        x: this.xAxis.scale.scale(points[i + 1].x),
      };
      result.push({
        from,
        to,
        id: points[i].x,
      });
    }
    return result;
  }

  draw(): void {
    if (!this.lines.length) {
      return;
    }
    let currentLine: LineAttributesType;
    for (let i = 0; i < this.lines.length - 1; i += 1) {
      currentLine = this.lines[i];
      drawLine(this.drawBus, currentLine.from, currentLine.to);
    }
    const lastLine: LineAttributesType = this.lines[this.lines.length - 1];
    const lastLineTo = this.interpolator.fromTo(
      lastLine.id,
      lastLine.from,
      lastLine.to,
      400,
    );
    drawLine(this.drawBus, lastLine.from, lastLineTo);
  }
}

export class PersistLineType extends PersistType {
  private lines: LineAttributesType[] = [];
  private interpolator: Interpolator = new Interpolator();

  constructor(
    protected drawBus: DrawBus,
    protected xAxis: Axis,
    protected yAxis: Axis,
  ) {
    super(drawBus, xAxis, yAxis);
  }

  setPoints(points: PointType[]): void {
    this.lines = this.prepare(points);
    super.setPoints(points);
  }

  private prepare(points: PointType[]): LineAttributesType[] {
    const result: LineAttributesType[] = [];
    let from: PointType;
    let to: PointType;
    for (let i = 0; i < points.length; i += 1) {
      if (!points[i + 1]) {
        continue;
      }
      from = {
        y: this.yAxis.scale.invert(points[i].y),
        x: this.xAxis.scale.scale(points[i].x),
      };
      to = {
        y: this.yAxis.scale.invert(points[i + 1].y),
        x: this.xAxis.scale.scale(points[i + 1].x),
      };
      result.push({
        from,
        to,
        id: points[i].x,
      });
    }
    return result;
  }

  reDraw(drawBus: DrawBus): void {
    if (!this.lines.length) {
      return;
    }
    let currentLine: LineAttributesType;
    for (let i = 0; i < this.lines.length - 1; i += 1) {
      currentLine = this.lines[i];
      drawLine(drawBus, currentLine.from, currentLine.to);
    }
    const lastLine: LineAttributesType = this.lines[this.lines.length - 1];
    const lastLineTo = this.interpolator.fromTo(
      lastLine.id,
      lastLine.from,
      lastLine.to,
      400,
    );
    drawLine(drawBus, lastLine.from, lastLineTo);
  }
}

