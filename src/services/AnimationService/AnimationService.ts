// types
import { Animation } from "./Animation";

export class AnimationService {
  frameDuration: number = 17;
  animations: Animation[] = [];
  dropFrames: number = 0;

  constructor() {
    this.animate = this.animate.bind(this);
  }

  add(animation: Animation): void {
    /*for (let i = 0; i < this.animations.length; i += 1) {
      if (this.animations[index].chartInstance === chartInstance) {
        // replacing an in progress animation
        this.animations[index].animationItem = animationItem;
        return;
      }
    }*/

    this.animations.push(animation);
    if (this.animations.length === 1) {
      requestAnimationFrame(this.animate);
    }
  }

  cancel(): void {
    this.animations = [];
  }

  private animate(): void {
    const startTime = Date.now();
    let framesToDrop = 0;

    if (this.dropFrames > 1) {
      framesToDrop = Math.floor(this.dropFrames);
      this.dropFrames -= framesToDrop;
    }

    let currentAnimation: Animation;
    for (let i = 0; i < this.animations.length; i += 1) {
      currentAnimation = this.animations[i];
      if (currentAnimation.currentStep === null) {
        currentAnimation.currentStep = 0;
      }

      currentAnimation.currentStep += 1 + framesToDrop;
      if (currentAnimation.currentStep > currentAnimation.numSteps) {
        currentAnimation.currentStep = currentAnimation.numSteps;
      }
      currentAnimation.render(currentAnimation);

      if (currentAnimation.currentStep === currentAnimation.numSteps) {
        this.animations.splice(i, 1);
        // Keep the index in place to offset the splice
        i -= 1;
      }
    }

    const endTime = Date.now();
    const delay = endTime - startTime - this.frameDuration;
    const frameDelay = delay / this.frameDuration;

    if (frameDelay > 1) {
      this.dropFrames += frameDelay;
    }

    if (this.animations.length > 0) {
      window.requestAnimationFrame(this.animate);
    }
  }
}
