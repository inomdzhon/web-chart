import { DrawBus } from "drawBus";
import { PointType } from "core";
import { ViewArea } from "../core/ViewArea";

import { Zoom } from "./zoom";
import { Pan, InfoType } from "./pan";
import { Axis } from "./axis";

// types
import { extent, now } from "utils";

export class Axes {
  xAxis: Axis;
  yAxis: Axis;

  private zoom: Zoom;
  private pan: Pan;
  private isStopped: boolean = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private drawBus: DrawBus,
    private viewArea: ViewArea,
  ) {
    this.xAxis = new Axis("linear", "bottom", drawBus, this.viewArea);
    this.yAxis = new Axis("linear", "right", drawBus, this.viewArea);

    // init axes Zoom
    this.zoom = new Zoom(canvas, {
      domain: {
        defaultDiff: 1000 * 60 * 2,
        minDiff: 1000 * 30,
        maxDiff: 1000 * 60 * 60,
      },
    });

    // init Axes Pan
    this.pan = new Pan(canvas);
    this.updateXAxisByPan = this.updateXAxisByPan.bind(this);
    this.pan.onPan(this.updateXAxisByPan);
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

  private updateXAxisByPan(info: InfoType): void {
    const nowMilliseconds = now();
    let domain: [number, number] = this.xAxis.domain;
    const domainChange = info.x.diff * 100 * this.zoom.domain.k;
    switch (info.x.direction) {
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
}
