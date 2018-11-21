import { ScaleType } from "./typing/types";
import { niceNumber } from "../utils";

export function linear(
  domain: [number, number],
  range: [number, number],
  cap: boolean = true,
): ScaleType {
  const domainDiff = domain[1] - domain[0];
  const rangeDiff = range[1] - range[0];
  let ratio: number = 0;
  const isEqual = domainDiff === 0 || rangeDiff === 0;

  if (!isEqual) {
    ratio = rangeDiff / domainDiff;
  }

  function scale(value: number): number {
    if (isEqual) {
      return range[0];
    }
    const result = range[0] + ratio * (value - domain[0]);
    return cap ? Math.min(range[1], Math.max(range[0], result)) : result;
  }

  function invert(value: number): number {
    if (isEqual) {
      return range[0];
    }
    const result = range[0] + (rangeDiff - ratio * (value - domain[0]));
    return cap ? Math.min(range[1], Math.max(range[0], result)): result;
  }

  function ticks(count: number = 10): number[] {
    const niceRange = niceNumber(domain[1] - domain[0], false);
    const spacing = niceNumber(niceRange / (count - 1), true);
    const niceMin = Math.floor(domain[0] / spacing) * spacing;
    const niceMax = Math.ceil(domain[1] / spacing) * spacing;

    // Put the values into the ticks array
    const ticks: number[] = [];
    for (let j = niceMin; j <= niceMax; j += spacing) {
      ticks.push(j);
    }
    return ticks;
  }

  return {
    scale,
    invert,
    ticks,
    range(): [number, number] {
      return range;
    },
    domain(): [number, number] {
      return domain;
    },
  };
}
