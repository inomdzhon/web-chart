// types
import { CommandType } from "./typing/types";

export class DrawBus {
  private queue: CommandType[] = [];

  constructor(private ctx: CanvasRenderingContext2D) {
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  commit(): void {
    let currentCommand: CommandType;
    for (let i = 0; i < this.queue.length; i += 1) {
      currentCommand = this.queue[i];
      switch (currentCommand.type) {
        case "line": {
          this.ctx.beginPath();
          this.ctx.strokeStyle = currentCommand.style.color;
          this.ctx.lineWidth = currentCommand.style.width;

          if (currentCommand.style.dash) {
            this.ctx.setLineDash(currentCommand.style.dash);
          }

          this.ctx.moveTo(
            currentCommand.position.x1,
            currentCommand.position.y1,
          );
          this.ctx.lineTo(
            currentCommand.position.x2,
            currentCommand.position.y2,
          );
          this.ctx.stroke();

          if (currentCommand.style.dash) {
            this.ctx.setLineDash([]);
          }
          break;
        }
        case "text": {
          const prevFont = this.ctx.font;
          const prevFill = this.ctx.fillStyle;
          this.ctx.font = currentCommand.style.font;
          this.ctx.fillStyle = currentCommand.style.color;
          this.ctx.fillText(
            // @ts-ignore
            currentCommand.value,
            currentCommand.position.x,
            currentCommand.position.y,
          );
          this.ctx.font = prevFont;
          this.ctx.fillStyle = prevFill;
          break;
        }
      }
    }
    this.queue = [];
  }

  add(command: CommandType): void {
    this.queue.push(command);
  }
}
