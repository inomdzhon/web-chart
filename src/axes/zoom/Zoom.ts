// types
import { ZoomType } from "./typing/types";

export class Zoom {
  constructor(private canvas: HTMLCanvasElement, public domain: ZoomType) {
    this.handleZoom = this.handleZoom.bind(this);
    canvas.addEventListener("wheel", this.handleZoom);
  }

  private handleZoom(event: MouseEvent): void {
    event.preventDefault();
    // @ts-ignore
    const domainChange = 1000 * Math.abs(event.deltaY);
    // @ts-ignore
    if (event.deltaY < 0) {
      if (this.domain.diff >= this.domain.minDiff + domainChange) {
        this.domain.diff -= domainChange;
      } else {
        this.domain.diff = this.domain.minDiff;
      }
    } else {
      if (this.domain.diff <= this.domain.maxDiff - domainChange) {
        this.domain.diff += domainChange;
      } else {
        this.domain.diff = this.domain.maxDiff;
      }
    }
  }
}
