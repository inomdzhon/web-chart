// types
import { PointType, LineShapeAttributesType } from "./typing/types";

import { Line } from './Line';
import { Axis } from "axes/axis";

type HashType = {
  [key: string]: number;
};

export class LineType {
  private lines: Line[] = [];
  private hash: HashType = {};

  constructor(private ctx: CanvasRenderingContext2D, private xAxis: Axis, private yAxis: Axis) {
  }

  setPoints(points: PointType[]): void {
   this.update(this.prepare(points));
   this.draw();
  }

  private getById(id: number): Line | null {
    return this.lines[this.hash[id]] || null;
  }

  private update(lines: LineShapeAttributesType[]): void {
    const newHash: HashType = {};
    const newLines: Line[] = [];

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      newHash[line.id] = i;
      const origin = this.getById(line.id);
      if (origin) {
        origin.update(line);
        newLines.push(origin);
      } else {
        const shape = new Line(line, this.ctx);
        newLines.push(shape);
      }
    }

    // commit changes
    this.lines = newLines;
    this.hash = newHash;
  }

  private prepare(points: PointType[]): LineShapeAttributesType[] {
    const result: LineShapeAttributesType[] = [];
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
    for (let i = 0; i < this.lines.length - 1; i += 1) {
      this.lines[i].draw();
    }
    this.lines[this.lines.length - 1].transition();
  }
}
