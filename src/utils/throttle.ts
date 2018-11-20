export function throttle(func: () => void, ms: number, context: any): () => void {
  let isThrottled = false;
  let savedArgs;

  function wrapper(): void {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      return;
    }
    // @ts-ignore
    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(context, savedArgs);
        savedArgs = null;
      }
    }, ms);
  }

  return wrapper;
}
