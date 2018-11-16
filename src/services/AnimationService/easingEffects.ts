export const easingEffects = {
  linear(t: number): number {
    return t;
  },
  easeInQuad(t: number): number {
    return t * t;
  },
  easeOutQuad(t: number): number {
    return -1 * t * (t - 2);
  },
  easeInOutQuad(t: number): number {
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * t * t;
    }
    return (-1 / 2) * (--t * (t - 2) - 1);
  },
  easeInCubic(t: number): number {
    return t * t * t;
  },
  easeOutCubic(t: number): number {
    return 1 * ((t = t / 1 - 1) * t * t + 1);
  },
  easeInOutCubic(t: number): number {
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * t * t * t;
    }
    return (1 / 2) * ((t -= 2) * t * t + 2);
  },
  easeInQuart(t: number): number {
    return t * t * t * t;
  },
  easeOutQuart(t: number): number {
    return -1 * ((t = t / 1 - 1) * t * t * t - 1);
  },
  easeInOutQuart(t: number): number {
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * t * t * t * t;
    }
    return (-1 / 2) * ((t -= 2) * t * t * t - 2);
  },
  easeInQuint(t: number): number {
    return 1 * (t /= 1) * t * t * t * t;
  },
  easeOutQuint(t: number): number {
    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
  },
  easeInOutQuint(t: number): number {
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * t * t * t * t * t;
    }
    return (1 / 2) * ((t -= 2) * t * t * t * t + 2);
  },
  easeInSine(t: number): number {
    return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
  },
  easeOutSine(t: number): number {
    return 1 * Math.sin((t / 1) * (Math.PI / 2));
  },
  easeInOutSine(t: number): number {
    return (-1 / 2) * (Math.cos((Math.PI * t) / 1) - 1);
  },
  easeInExpo(t: number): number {
    return t === 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
  },
  easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 * (-Math.pow(2, (-10 * t) / 1) + 1);
  },
  easeInOutExpo(t: number): number {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * Math.pow(2, 10 * (t - 1));
    }
    return (1 / 2) * (-Math.pow(2, -10 * --t) + 2);
  },
  easeInCirc(t: number): number {
    if (t >= 1) {
      return t;
    }
    return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
  },
  easeOutCirc(t: number): number {
    return Math.sqrt(1 - (t = t / 1 - 1) * t);
  },
  easeInOutCirc(t: number): number {
    if ((t /= 1 / 2) < 1) {
      return (-1 / 2) * (Math.sqrt(1 - t * t) - 1);
    }
    return (1 / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  easeInElastic(t: number): number {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t === 0) {
      return 0;
    }
    if ((t /= 1) === 1) {
      return 1;
    }
    if (!p) {
      p = 1 * 0.3;
    }
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    return -(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin(((t * 1 - s) * (2 * Math.PI)) / p)
    );
  },
  easeOutElastic(t: number): number {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t === 0) {
      return 0;
    }
    if ((t /= 1) === 1) {
      return 1;
    }
    if (!p) {
      p = 1 * 0.3;
    }
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) + 1
    );
  },
  easeInOutElastic(t: number): number {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t === 0) {
      return 0;
    }
    if ((t /= 1 / 2) === 2) {
      return 1;
    }
    if (!p) {
      p = 1 * (0.3 * 1.5);
    }
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(1 / a);
    }
    if (t < 1) {
      return (
        -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * 1 - s) * (2 * Math.PI)) / p))
      );
    }
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) *
        0.5 +
      1
    );
  },
  easeInBack(t: number): number {
    const s = 1.70158;
    return 1 * (t /= 1) * t * ((s + 1) * t - s);
  },
  easeOutBack(t: number): number {
    const s = 1.70158;
    return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
  },
  easeInOutBack(t: number): number {
    let s = 1.70158;
    if ((t /= 1 / 2) < 1) {
      return (1 / 2) * (t * t * (((s *= 1.525) + 1) * t - s));
    }
    return (1 / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },
  easeInBounce(t: number): number {
    return 1 - easingEffects.easeOutBounce(1 - t);
  },
  easeOutBounce(t: number): number {
    if ((t /= 1) < 1 / 2.75) {
      return 1 * (7.5625 * t * t);
    }
    if (t < 2 / 2.75) {
      return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
    }
    if (t < 2.5 / 2.75) {
      return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
    }
    return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
  },
  easeInOutBounce(t: number): number {
    if (t < 1 / 2) {
      return easingEffects.easeInBounce(t * 2) * 0.5;
    }
    return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
  },
};
