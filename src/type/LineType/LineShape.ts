// core
import { Shape } from "layer";

// typing
import { PointType, LineShapeOptionsType, LineShapeAttributesType } from "./typing/types";

export class LineShape extends Shape<LineShapeAttributesType> {
  private options: LineShapeOptionsType = {
    width: 2,
    color: "rgba(76,117,163 ,1 )",
  };

  private ctxOptions?: LineShapeOptionsType;

  constructor(attrs: LineShapeAttributesType, private ctx: CanvasRenderingContext2D) {
    super(attrs);
  }

  setOptions(options: Partial<LineShapeOptionsType>): void {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  setPosition(from: PointType, to: PointType): void {
    this.attributes.from = from;
    this.attributes.to = to;
  }

  destroy(): void {}

  transition(): void {}

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
