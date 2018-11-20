// utils
import { now } from "utils";

function lerp(startValue: number, endValue: number, t: number): number {
  return startValue * (1 - t) + endValue * t;
}

// typing
import { LineShapeOptionsType, LineShapeAttributesType } from "./typing/types";

export class Line {
  private options: LineShapeOptionsType = {
    width: 2,
    color: "rgba(76,117,163 ,1 )",
  };

  private ctxOptions?: LineShapeOptionsType;
  private duration: number = 400;
  private initTime: number = now();

  private transitionState: {
    startTime?: number;
    duration: number;
  } = {
    duration: 400,
  };

  private attributes: LineShapeAttributesType;
  constructor(
    attrs: LineShapeAttributesType,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.attributes = attrs;
  }

  update(attrs: LineShapeAttributesType): void {
    this.attributes = attrs;
  }
  transition(): void {
    const nowMs = now();
    if (!this.transitionState.startTime) {
      this.transitionState.startTime = nowMs;
    }
    this.saveContextOptions();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.options.color;
    this.ctx.lineWidth = this.options.width;
    this.ctx.moveTo(this.attributes.from.x, this.attributes.from.y);
    const elapsedMs = now() - this.initTime;
    if (elapsedMs < this.transitionState.duration) {
      const t = elapsedMs / this.duration;
      const toX = lerp(this.attributes.from.x, this.attributes.to.x, t);
      const toY = lerp(this.attributes.from.y, this.attributes.to.y, t);
      this.ctx.lineTo(toX, toY);
    } else {
      this.ctx.lineTo(this.attributes.to.x, this.attributes.to.y);
    }
    this.ctx.stroke();
    this.restoreContextOptions();
  }

  draw(): void {
    this.saveContextOptions();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.options.color;
    this.ctx.lineWidth = this.options.width;
    this.ctx.moveTo(this.attributes.from.x, this.attributes.from.y);
    this.ctx.lineTo(this.attributes.to.x, this.attributes.to.y);
    this.ctx.stroke();
    this.restoreContextOptions();
  }

  private saveContextOptions(): void {
    // @ts-ignore
    this.storedOptions = {
      color: this.ctx.strokeStyle,
      width: this.ctx.lineWidth,
    };
  }

  private restoreContextOptions(): void {
    if (this.ctxOptions) {
      this.ctx.strokeStyle = this.ctxOptions.color;
      this.ctx.lineWidth = this.ctxOptions.width;
    }
    this.ctxOptions = undefined;
  }
}
