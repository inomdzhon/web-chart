// core
import { Layer } from "layer";

// typing
import { LineShapeAttributesType } from "./typing/types";

// shape
import { LineShape } from "./LineShape";

export class LineLayer extends Layer<LineShapeAttributesType, LineShape> {
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.ctx = ctx;
  }

  createShape(attributes: LineShapeAttributesType): LineShape {
    return new LineShape(attributes, this.ctx);
  }
}
