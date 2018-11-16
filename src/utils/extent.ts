type ValueOfType<T> = (value: T, index: number, values: T[]) => number;

/**
 * return max and min value from collection
 */
export function extent<T>(
  values: T[],
  valueof?: ValueOfType<T>,
): [number, number] {
  const n = values.length;
  let i = -1;
  let value;
  let min;
  let max;

  if (!valueof) {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) {
          // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) {
          // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}
