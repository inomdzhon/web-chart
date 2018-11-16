export class Point {
  position: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  styles: {
    radius: number;
    borderWidth: number;
    backgroundColor: string;
    borderColor: string;
  } = {
    radius: 1,
    borderWidth: 2,
    backgroundColor: "#000",
    borderColor: "#000",
  };

  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(): void {
    const { position, styles } = this;
    if (styles.radius > 0 || styles.borderWidth > 0) {
      this.ctx.beginPath();
      this.ctx.arc(position.x, position.y, styles.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.strokeStyle = styles.borderColor;
      this.ctx.lineWidth = styles.borderWidth;
      this.ctx.fillStyle = styles.backgroundColor;
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}
