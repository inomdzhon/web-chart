
export class Animation {
  // the current animation step
  currentStep: number = 0;

  // default number of steps
  numSteps: number = 60;

  // the easing to use for this animation
  easing: string = "";

  constructor(numSteps: number = 60, easing: string) {
    this.numSteps = numSteps;
    this.easing = easing;
  }

  // render function used by the animation service
  render(_item: this): void {}

  // user specified callback to fire on each step of the animation
  onAnimationProgress(): void {}

  // user specified callback to fire when the animation finishes
  onAnimationComplete(): void {}
}
