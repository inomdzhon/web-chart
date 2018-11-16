import { Platform } from "./Platform";
import { ScaleType } from "../scale";
import { ViewPortType } from "./typing/types";

type OptionsType = {
  label: {
    color: string;
    font: string;
  };
  grid: {
    colorAtZero: string;
    color: string;
  };
};

export class Axes {
  private options: OptionsType = {
    label: {
      color: "rgba(255, 255, 255, 0.3)",
      font: "13px Tahoma",
    },
    grid: {
      colorAtZero: "rgba(255, 255, 255, 0.3)",
      color: "rgba(255, 255, 255, 0.1)",
    },
  };

  constructor(private platform: Platform) {}

  draw(viewPort: ViewPortType, yScale: ScaleType, xScale: ScaleType): void {
    this.drawYScale(viewPort, yScale);
    this.drawXScale(viewPort, xScale);
  }

  private drawYScale(viewPort: ViewPortType, yScale: ScaleType): void {
    const ticks = yScale.ticks();
    for (let i = 0; i < ticks.length; i += 1) {
      const y = yScale.invert(ticks[i]);
      let color = this.options.grid.color;
      let dash = [5];
      if (ticks[i] === 0) {
        color = this.options.grid.colorAtZero;
        dash = [];
      }
      this.platform.line(
        { y, x: viewPort.content.margin.left },
        { y, x: viewPort.width - viewPort.scales.yScale.width },
        {
          color,
          dash,
          width: 1,
        },
      );
      this.platform.line(
        { y, x: viewPort.width - viewPort.scales.yScale.width },
        { y, x: viewPort.width - viewPort.scales.yScale.width + 10 },
        {
          width: 1,
          color: this.options.grid.color,
        },
      );

      this.platform.fillText(
        ticks[i],
        viewPort.width - viewPort.scales.yScale.width + 15,
        y + 3,
        {
          color: this.options.label.color,
          font: this.options.label.font,
        },
      );
    }
  }

  private drawXScale(viewPort: ViewPortType, xScale: ScaleType): void {
    const ticks = xScale.ticks();
    for (let i = 1; i < ticks.length - 1; i += 1) {
      const x = xScale.scale(ticks[i]);
      this.platform.line(
        { x, y: 0 },
        { x, y: viewPort.height - viewPort.scales.xScale.height },
        {
          width: 1,
          color: this.options.grid.color,
          dash: [5],
        },
      );
      this.platform.line(
        { x, y: viewPort.height - viewPort.scales.xScale.height },
        { x, y: viewPort.height - viewPort.scales.xScale.height + 10 },
        {
          width: 1,
          color: this.options.grid.color,
        },
      );
      const date = new Date(ticks[i]);
      this.platform.fillText(
        this.formatTime(date),
        x - 20,
        viewPort.height +
          viewPort.content.margin.top +
          viewPort.content.margin.bottom -
          viewPort.scales.xScale.height,
        {
          color: this.options.label.color,
          font: this.options.label.font,
        },
      );
    }
  }

  private pad2(value: number): string {
    return (value < 10 ? "0" : "") + value;
  }

  formatTime(date: Date): string {
    return `${this.pad2(date.getHours())}:${this.pad2(
      date.getMinutes(),
    )}:${this.pad2(date.getSeconds())}`;
  }
}
