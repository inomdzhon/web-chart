type PointType = {
  x: number;
  y: number;
};

export type OptionsType = {
  width: number;
  color: string;
  cap?: "butt" | "round" | "square";
  dash?: number[];
};

export class Line {
  private options: OptionsType = {
    width: 2,
    color: "#000",
  };
  private ctxOptions?: OptionsType;

  private from: PointType = { x: 0, y: 0 };
  private to: PointType = { x: 0, y: 0 };

  constructor(
    private id: string,
    private ctx: CanvasRenderingContext2D,
    options?: Partial<OptionsType>,
  ) {
    if (options) {
      this.setOptions(options);
    }
  }

  setOptions(options: Partial<OptionsType>): void {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  setPosition(from: PointType, to: PointType): void {
    this.from = from;
    this.to = to;
  }

  draw(): void {
    this.saveContextOptions();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.options.color;
    this.ctx.lineWidth = this.options.width;
    this.ctx.moveTo(this.from.x, this.from.y);
    this.ctx.lineTo(this.to.x, this.to.y);
    this.ctx.stroke();
    this.restoreContextOptions();
  }


  private saveContextOptions(): void {
    // @ts-ignore
    this.storedOptions = {
      color: this.ctx.strokeStyle,
      width: this.ctx.lineWidth,
    }
  }

  private restoreContextOptions(): void {
    if (this.ctxOptions) {
      this.ctx.strokeStyle = this.ctxOptions.color;
      this.ctx.lineWidth = this.ctxOptions.width;
    }
    this.ctxOptions = undefined;
  }
}
