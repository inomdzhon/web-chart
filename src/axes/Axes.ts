import { Platform, PointType } from "platform";
import { ViewArea } from "../core/ViewArea";

import { Zoom } from "./zoom";
import { Pan } from "./pan";
import { Axis } from "./axis";

// types
import { extent, now, pad2 } from "utils";

export class Axes {
  xAxis: Axis;
  yAxis: Axis;

  private zoom: Zoom;
  private pan: Pan;
  private isStopped: boolean = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private platform: Platform,
    private viewArea: ViewArea,
  ) {
    this.xAxis = new Axis("linear", "bottom", platform, this.viewArea);
    this.yAxis = new Axis("linear", "right", platform, this.viewArea);

    // init axes Zoom
    this.zoom = new Zoom(canvas, {
      diff: 1000 * 60 * 2,
      minDiff: 1000 * 30,
      maxDiff: 1000 * 60 * 60,
    });

    // init Axes Pan
    this.pan = new Pan(canvas);
    this.handlePan = this.handlePan.bind(this);
    this.pan.onPan(this.handlePan);
  }

  updateAxis(points: PointType[]): void {
    this.updateXAxis();
    this.updateYAxis(points);
  }

  updateXAxis(): void {
    const nowMilliseconds = now();
    let domain: [number, number] = this.xAxis.domain;
    if (!this.isStopped) {
      domain = [nowMilliseconds - this.zoom.domain.diff, nowMilliseconds];
    } else {
      domain = [
        this.xAxis.domain[1] - this.zoom.domain.diff,
        this.xAxis.domain[1],
      ];
    }
    const range: [number, number] = [
      this.viewArea.content.margin.left,
      this.viewArea.content.width + this.viewArea.content.margin.left,
    ];
    this.xAxis.update(domain, range);
  }

  updateXAxisByPan(pan: number): void {
    const nowMilliseconds = now();
    let domain: [number, number] = this.xAxis.domain;
    const direction: "left" | "right" = pan > 0 ? "left" : "right";
    const domainChange = Math.abs(pan) * 100;
    switch (direction) {
      case "left":
        domain = [
          this.xAxis.domain[0] - domainChange,
          this.xAxis.domain[1] - domainChange,
        ];
        break;
      case "right":
        if (this.xAxis.domain[1] + domainChange <= nowMilliseconds) {
          domain = [
            this.xAxis.domain[0] + domainChange,
            this.xAxis.domain[1] + domainChange,
          ];
        }
        break;
    }
    domain[1] + 1000 < nowMilliseconds
      ? (this.isStopped = true)
      : (this.isStopped = false);

    const range: [number, number] = [
      this.viewArea.content.margin.left,
      this.viewArea.content.width + this.viewArea.content.margin.left,
    ];
    this.xAxis.update(domain, range);
  }

  updateYAxis(points: PointType[]): void {
    const domain: [number, number] = extent(points, point => point.y);
    const range: [number, number] = [
      this.viewArea.content.margin.top,
      this.viewArea.content.height + this.viewArea.content.margin.top,
    ];
    this.yAxis.update(domain, range);
  }

  draw(): void {
    this.xAxis.draw();
    this.yAxis.draw();
  }

  private handlePan(dx: number): void {
    this.updateXAxisByPan(dx);
  }
}
