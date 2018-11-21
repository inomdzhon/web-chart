import { now } from "utils";

import { PointType } from "core";

export class Interpolator {
  id: number = 0;
  isProcessing: boolean = false;
  private startTime: number = 0;
  private elapsedMs: number = 0;
  private duration: number = 0;
  private startPoint: PointType = { x: 0, y: 0 };
  private endPoint: PointType = { x: 0, y: 0 };

  stop(): void {
    this.isProcessing = false;
    this.startTime = 0;
    this.elapsedMs = 0;
    this.startPoint = this.endPoint = { x: 0, y: 0 };
  }

  fromTo(
    id: number,
    startPoint: PointType,
    endPoint: PointType,
    duration: number,
  ): PointType {
    if (this.id !== id) {
      this.stop();
      this.id = id;
    }
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    const nowMs = now();
    if (!this.isProcessing) {
      this.isProcessing = true;
      this.startTime = nowMs;
      this.duration = duration;
    }
    this.elapsedMs = nowMs - this.startTime;
    if (this.elapsedMs < this.duration) {
      const t = this.elapsedMs / this.duration;
      return {
        x: this.lerp(this.startPoint.x, this.endPoint.x, t),
        y: this.lerp(this.startPoint.y, this.endPoint.y, t),
      };
    }
    return endPoint;
  }

  private lerp(startValue: number, endValue: number, t: number): number {
    return startValue * (1 - t) + endValue * t;
  }
}
