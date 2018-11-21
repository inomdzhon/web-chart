// types
import { InfoType } from "./typing/types";

export class Pan {
  private offsetX: number = 0;
  private offsetY: number = 0;
  private startX: number = 0;
  private startY: number = 0;
  private isDown: boolean = false;

  listeners: ((info: InfoType) => void)[] = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.reOffset = this.reOffset.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    window.addEventListener("scroll", this.reOffset);
    window.addEventListener("resize", this.reOffset);

    // listen for mouse events
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("mouseout", this.handleMouseOut);
    this.reOffset();
  }

  onPan(callback: (info: InfoType) => void): void {
    this.listeners.push(callback);
  }

  private handleMouseDown(event: MouseEvent): void {
    this.canvas.style.cursor = "move";
    // tell the browser we're handling this event
    event.preventDefault();
    event.stopPropagation();

    // calc the starting mouse X,Y for the drag
    // @ts-ignore
    this.startX = parseInt(event.clientX - this.offsetX, 10);
    // @ts-ignore
    this.startY = parseInt(event.clientY - this.offsetY, 10);

    // set the isDragging flag
    this.isDown = true;
  }

  private handleMouseUp(event: MouseEvent): void {
    // tell the browser we're handling this event
    event.preventDefault();
    event.stopPropagation();

    // clear the isDragging flag
    this.isDown = false;
    this.canvas.style.cursor = "";
  }

  private handleMouseMove(event: MouseEvent): void {
    // only do this code if the mouse is being dragged
    if (!this.isDown) {
      return;
    }

    // tell the browser we're handling this event
    event.preventDefault();
    event.stopPropagation();

    // get the current mouse position
    // @ts-ignore
    const mouseX = parseInt(event.clientX - this.offsetX, 10);
    // @ts-ignore
    const mouseY = parseInt(event.clientY - this.offsetY, 10);
    const dx = mouseX - this.startX;
    const dy = mouseY - this.startY;
    this.startX = mouseX;
    this.startY = mouseY;
    this.listeners.forEach(listener => listener(this.createInfo(dx)));
  }

  private handleMouseOut(event: MouseEvent): void {
    // tell the browser we're handling this event
    event.preventDefault();
    event.stopPropagation();

    // clear the isDragging flag
    this.isDown = false;
  }

  private reOffset(): void {
    const { left, top } = this.canvas.getBoundingClientRect();
    this.offsetX = left;
    this.offsetY = top;
  }

  private createInfo(dx: number): InfoType {
    const direction = dx > 0 ? "left" : "right";
    return {
      x: {
        direction,
        diff: Math.abs(dx),
      },
    };
  }
}
