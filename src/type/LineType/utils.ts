// types
import { PointType } from "./typing/types";

export function equal(
  prevPoints: PointType[],
  nextPoints: PointType[],
): boolean {
  return (
    prevPoints.length !== 0 &&
    nextPoints.length !== 0 &&
    nextPoints.length === prevPoints.length &&
    prevPoints[0].x === nextPoints[0].x &&
    prevPoints[prevPoints.length - 1].x === nextPoints[nextPoints.length - 1].x
  );
}
