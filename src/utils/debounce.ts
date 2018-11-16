export function debounce(
  func: () => void,
  wait: number,
  immediate?: boolean,
): () => void {
  let timeout;
  return function(): void {
    // @ts-ignore
    const context = this;
    const args = arguments;
    const later = function(): void {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
