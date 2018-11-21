import { DrawBus } from "drawBus";

// types
import { PointType } from "core";
import { Axis } from "axes/axis";
import { roundFloat } from "utils";

type PreviousType = {
  points: PointType[];
  xDomain?: [number, number];
};

export abstract class PersistType {
  private persistDrawBus: DrawBus;
  private persistCanvas!: HTMLCanvasElement;

  private previous: PreviousType = {
    points: [],
  };

  private xScaleOffset: number = 0;

  constructor(
    protected drawBus: DrawBus,
    protected xAxis: Axis,
    protected yAxis: Axis,
  ) {
    this.createPersistCanvas();
    const ctx = this.persistCanvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed get canvas 2D context");
    }
    this.persistDrawBus = new DrawBus(ctx);
    this.updateSizes();
  }

  abstract reDraw(drawBus: DrawBus): void;

  setPoints(points: PointType[]): void {
    if (!this.equal(this.previous.points, points)) {
      this.xScaleOffset = 0;
      this.updateSizes();
      this.reDraw(this.persistDrawBus);
      this.persistDrawBus.commit();
    }
    if (this.previous.xDomain) {
      const diff = this.xAxis.scale.scale(this.xAxis.domain[1]) - this.xAxis.scale.scale(this.previous.xDomain[1]);
      this.xScaleOffset -= diff;
      this.xScaleOffset = roundFloat(this.xScaleOffset, 1000)
    }

    this.previous.points = points;
    this.previous.xDomain = this.xAxis.domain.slice() as [number, number];
  }

  draw(): void {
    if (this.persistCanvas.width === 0 || this.persistCanvas.height === 0) {
      return;
    }
    console.log(this.xScaleOffset);
    this.drawBus.add({
      type: "image",
      value: this.persistCanvas,
      position: {
        x: this.xScaleOffset,
        y: 0,
      },
    });
  }

  private createPersistCanvas(): void {
    const canvas = document.createElement("canvas");
    this.persistCanvas = canvas;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "-200vw";
    canvas.style.background = "#000";
    canvas.style.zIndex = "100";
    document.body.appendChild(canvas);
  }

  private updateSizes(): void {
    const height = this.yAxis.range[0] + this.yAxis.range[1];
    const width = this.xAxis.range[0] + this.xAxis.range[1];
    this.persistCanvas.style.width = `${width}px`;
    this.persistCanvas.style.height = `${height}px`;
    this.persistCanvas.height = height;
    this.persistCanvas.width = width;
  }

  private equal(prevPoints: PointType[], nextPoints: PointType[]): boolean {
    return (
      prevPoints.length !== 0 &&
      nextPoints.length !== 0 &&
      nextPoints.length === prevPoints.length &&
      prevPoints[0].x === nextPoints[0].x &&
      prevPoints[prevPoints.length - 1].x ===
        nextPoints[nextPoints.length - 1].x
    );
  }
}
