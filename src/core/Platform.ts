// types
import { PointType, LineOptionsType } from "./typing/types";

export class Platform {
  constructor(private ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
  }

  line(
    fromPoint: PointType,
    toPoint: PointType,
    options: LineOptionsType = { width: 2, color: "#000" },
  ): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = options.color;
    this.ctx.lineWidth = options.width;

    if (options.dash) {
      this.ctx.setLineDash(options.dash);
    }

    if (options.cap) {
      this.ctx.lineCap = options.cap;
    }
    this.ctx.moveTo(fromPoint.x, fromPoint.y);
    this.ctx.lineTo(toPoint.x, toPoint.y);
    this.ctx.stroke();

    if (options.dash) {
      this.ctx.setLineDash([]);
    }
    if (options.cap) {
      this.ctx.lineCap = "butt";
    }
  }

  lineByPoints(points: PointType[], options: LineOptionsType = { width: 2, color: "#000" }): void {
    let lastY = 0;
    let lastX = 0;

    for (let i = 0; i < points.length; i += 1) {
      const currentY = points[i].y;
      const currentX = points[i].x;
      if (i === 0) {
        lastY = currentY;
        lastX = currentX;
      }

      this.line({ x: lastX, y: lastY }, { x: currentX, y: currentY }, options);

      lastY = currentY;
      lastX = currentX;
    }
  }

  fillText(
    text: string | number,
    x: number,
    y: number,
    options: {
      color: string;
      font: string;
    } = {
      color: "#000",
      font: "12px",
    },
  ): void {
    const prevFont = this.ctx.font;
    const prevFill = this.ctx.fillStyle;
    this.ctx.font = options.font;
    this.ctx.fillStyle = options.color;
    this.ctx.fillText(text.toString(), x, y);
    this.ctx.font = prevFont;
    this.ctx.fillStyle = prevFill;
  }

  measureText(text: string): any {
    return this.ctx.measureText(text);
  }

  clear(): void {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setSize(width: number, height: number): void {
    if (window.devicePixelRatio) {
      this.ctx.canvas.style.width = `${width}px`;
      this.ctx.canvas.style.height = `${height}px`;
      this.ctx.canvas.height = height * window.devicePixelRatio;
      this.ctx.canvas.width = width * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }
}
