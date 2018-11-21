// types
import { ZoomType, OptionsType } from "./typing/types";

export class Zoom {
  domain: ZoomType = {
    diff: 0,
    maxDiff: 0,
    minDiff: 0,
    k: 0,
  };

  private defaultDomainDiff: number = 0;

  constructor(private canvas: HTMLCanvasElement, public options: OptionsType) {
    this.defaultDomainDiff = options.domain.defaultDiff;
    this.domain.diff = options.domain.defaultDiff;
    this.domain.minDiff = options.domain.minDiff;
    this.domain.maxDiff = options.domain.maxDiff;
    this.updateZoomRatio();

    this.handleZoom = this.handleZoom.bind(this);
    canvas.addEventListener("wheel", this.handleZoom);
  }

  private handleZoom(event: MouseEvent): void {
    event.preventDefault();
    // @ts-ignore
    const domainChange = 100 * Math.abs(event.deltaY) * this.domain.k;
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
    this.updateZoomRatio();
  }

  private updateZoomRatio(): void {
    if (this.defaultDomainDiff !== 0) {
      this.domain.k = this.domain.diff / this.defaultDomainDiff;
    }
  }
}
