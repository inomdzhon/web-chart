// core
import { LineLayer } from "./LineLayer";

// types
import { PointType, LineShapeAttributesType } from "./typing/types";

export class LineType {
  private lineLayer: LineLayer;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.lineLayer = new LineLayer(ctx);
  }

  setPoints(points: PointType[]): void {
    this.lineLayer.set(this.prepare(points));
    this.lineLayer.draw();
  }

  private prepare(points: PointType[]): LineShapeAttributesType[] {
    const result: LineShapeAttributesType[] = [];
    let from: PointType;
    let to: PointType;
    for (let i = 0; i < points.length; i += 1) {
      if (!points[i + 1]) {
        continue;
      }
      from = points[i];
      to = points[i + 1];
      result.push({
        from,
        to,
        id: from.x,
      });
    }
    return result;
  }

}
