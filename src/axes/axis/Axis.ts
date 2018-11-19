// types
import {
  AxisPositionType,
  AxisTypeType,
  ScaleType,
  OptionsType,
} from "./typing/types";
import { Platform } from "platform";

import { linear } from "./linear";
import { ViewArea } from "core/ViewArea";
import { pad2 } from "utils";

export class Axis {
  domain: [number, number] = [0, 0];
  range: [number, number] = [0, 0];
  scale: ScaleType;

  options: OptionsType = {
    label: {
      color: "rgba(255, 255, 255, 0.3)",
      font: "13px Tahoma",
    },
    grid: {
      colorAtZero: "rgba(255, 255, 255, 0.3)",
      color: "rgba(255, 255, 255, 0.1)",
    },
  };

  constructor(
    private type: AxisTypeType,
    private position: AxisPositionType,
    private platform: Platform,
    private viewArea: ViewArea,
  ) {
    switch (type) {
      case "linear":
      default:
        this.scale = linear(this.domain, this.range);
    }
  }

  update(domain: [number, number], range: [number, number]): void {
    this.domain = domain;
    this.range = range;
    this.scale = linear(this.domain, this.range);
  }

  draw(): void {
    const ticks = this.scale.ticks();
    let color = this.options.grid.color;
    let dash = [5];
    switch (this.position) {
      case "right": {
        for (let i = 0; i < ticks.length; i += 1) {
          const y = this.scale.invert(ticks[i]);
          this.platform.line(
            { y, x: this.viewArea.content.margin.left },
            { y, x: this.viewArea.width - this.viewArea.scales.yScale.width },
            {
              color,
              dash,
              width: 1,
            },
          );

          this.platform.fillText(
            ticks[i],
            this.viewArea.width - this.viewArea.scales.yScale.width + 15,
            y + 3,
            {
              color: this.options.label.color,
              font: this.options.label.font,
            },
          );
        }

        break;
      }
      case "bottom": {
        for (let i = 1; i < ticks.length - 1; i += 1) {
          if (ticks[i] === 0) {
            color = this.options.grid.colorAtZero;
            dash = [];
          }
          const x = this.scale.scale(ticks[i]);
          this.platform.line(
            { x, y: this.viewArea.content.margin.top },
            { x, y: this.viewArea.height - this.viewArea.scales.xScale.height },
            {
              width: 1,
              color: this.options.grid.color,
              dash: [5],
            },
          );
          const date = new Date(ticks[i]);
          this.platform.fillText(
            this.formatTime(date),
            x - 20,
            this.viewArea.height +
              this.viewArea.content.margin.top +
              this.viewArea.content.margin.bottom -
              this.viewArea.scales.xScale.height,
            {
              color: this.options.label.color,
              font: this.options.label.font,
            },
          );
        }
      }
    }
  }

  private formatTime(date: Date): string {
    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(
      date.getSeconds(),
    )}`;
  }
}
